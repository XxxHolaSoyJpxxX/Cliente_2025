import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import path from 'node:path';
import { fileURLToPath } from 'node:url'; // Used to resolve the path from the module URL
import { dirname } from 'node:path';      // Used to get the directory name

// --- Fix for __dirname in ES Modules ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// ----------------------------------------

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// Health check endpoint
app.get("/health", (req, res) => res.json({ status: "ok" }));

const users = new Map();

// --- Socket.IO Handlers ---
io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado:", socket.id);

  socket.on("user_connected", (username) => {
    console.log(`Usuario conectado: ${username}`);
    users.set(socket.id, username);
    // Notify everyone else (excluding the sender)
    socket.broadcast.emit("user_connected", username);
    // OPTIONAL: Send the list of current users to the new user
    socket.emit("current_users", Array.from(users.values()));
  });

  socket.on("message", (data) => {
    console.log("Mensaje recibido:", data);
    // Send the message to ALL clients (including the sender)
    io.emit("message", data);
  });

  socket.on("disconnect", () => {
    const username = users.get(socket.id);
    if (username) {
      console.log(`Usuario desconectado: ${username}`);
      users.delete(socket.id);
      // Notify everyone else (excluding the sender)
      socket.broadcast.emit("user_disconnected", username);
    }
  });
});


// --- Static File Serving (Angular) ---
// NOTE: Change 'dist/tu-app' to the actual output directory name of your Angular build.
// Common modern path is 'dist/<project-name>/browser'
const angularDistPath = path.join(__dirname, 'dist/chat');

app.use(express.static(angularDistPath));

// Fallback route: For any other GET request, send the Angular index.html for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(angularDistPath, 'index.html'));
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Servidor Socket.IO corriendo en http://localhost:${PORT}`));