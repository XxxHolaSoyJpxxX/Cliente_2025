import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.get("/health", (req, res) => res.json({ status: "ok" }));

const users = new Map();

io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado:", socket.id);

  socket.on("user_connected", (username) => {
    console.log(`Usuario conectado: ${username}`);
    users.set(socket.id, username);
    socket.broadcast.emit("user_connected", username);
  });

  socket.on("message", (data) => {
    console.log("Mensaje recibido:", data);
    io.emit("message", data);
  });

  socket.on("disconnect", () => {
    const username = users.get(socket.id);
    if (username) {
      console.log(`Usuario desconectado: ${username}`);
      users.delete(socket.id);
      socket.broadcast.emit("user_disconnected", username);
    }
  });
});

server.listen(3000, () => console.log("Servidor Socket.IO en http://localhost:3000"));
