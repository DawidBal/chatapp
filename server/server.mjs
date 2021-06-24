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

  client.on('send-message', (message) => {
    io.emit('receive-message', message);
  })

  client.broadcast.emit('connected', "INFO: User has connected");

  client.on('disconnect', (reason) => {
    console.log(`user has disconnected ${reason}`);
    client.broadcast.emit('disconnected', 'INFO: User has disconnected')
  })
});

