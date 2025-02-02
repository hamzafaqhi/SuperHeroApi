import { Server } from "socket.io";

let io;

export const setupSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("A new client has connected");
    socket.emit("message", "Welcome to the Superhero App!");

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
};

export const getSocketInstance = () => io;
