import { Server } from 'Socket.io';
import express from 'express';
import http from 'http';

const app = express();
const server = http.createServer(app);
const PORT = 3001;
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  }
});

server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
})

io.on('connection', (client) => {

io.on('connection', (client) => {
  console.log("A user has connected");

  client.on('disconnect', (reason) => {
    console.log(`user has disconnected ${reason}`);
  })
});

