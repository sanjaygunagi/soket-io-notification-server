const express = require("express");
const socketIo = require("socket.io");
const http = require("http");

const PORT = process.env.PORT || 5002;
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("client connected: ", socket.id);

  // for (let i = 0; i < 5; i++) {
  //   io.emit("test", "hello from server " + i);
  // }

  io.emit("test", { id: "2321", message: "new order" });
  io.emit("test", { id: "2321", message: " order cancelled" });

  // socket.join("clock-room");

  socket.on("disconnect", (reason) => {
    console.log(reason);
  });
});

setInterval(() => {
  // io.to("clock-room").emit("time", new Date());
  io.emit("time", new Date());
}, 1000);

server.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log("Server running on Port ", PORT);
});
