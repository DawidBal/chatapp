import { Server } from 'Socket.io';
import express from 'express';
import http from 'http';

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

io.on('connection', (client) => {
  console.log("user connected successfully")

  client.on('send-message', ({ message, username }) => {
    io.emit('receive-message', { message, username });
  })

  client.on('set-username', (user) => {
    client.username = user;
    const message = `${user} has connected`;
    const username = 'Server';
    client.broadcast.emit('connected', { message, username });
  })

  client.on('disconnect', (reason) => {
    console.log(`user has disconnected ${reason}`);
    if(client.username) {
      const message = `${client.username} has disconnected`;
      const username = 'Server';
      client.broadcast.emit('disconnected', { message, username })
    }
  })
});

