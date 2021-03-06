import { Server } from 'Socket.io';
import express from 'express';
import http from 'http';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

const app = express();
const server = http.createServer(app);
const PORT = 8080;
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  }
});

server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
})

let userCounter = 0;
let userList = [];

io.on('connection', (client) => {
  console.log("user connected successfully")

  client.on('send-message', ({message, username }) => {
    const id = uuidv4();
    const timestamp = moment().format('LTS');
    io.emit('receive-message', { id, message, username, timestamp });
  })

  client.on('set-username', (user) => {
    client.username = user;
    const message = `${user} has connected`;
    const username = 'Server';
    const id = uuidv4();
    client.broadcast.emit('connected', { id, message, username });

    userCounter++;
    userList.push({ id, user });
    io.emit('user-counter', { userCounter, userList });
  })

  client.on('is-typing', () => {
    const username = client.username;
    const message = `${username} is typing...`;
    const id = uuidv4();
    client.broadcast.emit('typing-message', { id, message, username});
  })

  client.on('stoped-typing', () => {
    const username = client.username;
    client.broadcast.emit('clear-typing-message', username);
  })

  client.on('disconnect', (reason) => {
    if(client.username) {
      console.log(`${client.username} has disconnected ${reason}`);
      const message = `${client.username} has disconnected`;
      const username = 'Server';
      const id = uuidv4();
      client.broadcast.emit('disconnected', { id, message, username })
      client.broadcast.emit('clear-typing-message', client.username);

      userCounter--;
      userList = [...userList].filter(user => user.user !== client.username);
      io.emit('user-counter-clear', { userCounter, userList });
    }
  })
});

