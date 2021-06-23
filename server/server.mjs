import { Server } from 'Socket.io';
import express from 'express';
import http from 'http';
import path from 'path';

const app = express();
const server = http.createServer(app);
const PORT = 3001;
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});
const __dirname = path.resolve();

server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
})

app.use(express.static(path.join(__dirname, '.')));

io.on('connection', (client) => {
  console.log("A user has connected");

  client.on('disconnect', (reason) => {
    console.log(`user has disconnected ${reason}`);
  })
});

