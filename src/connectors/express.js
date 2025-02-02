import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import http from "http"; // Import http to create the server
import * as routes from "./routes.js"; // Import routes
import { setupSocket } from "./socket.js"; // Import socket setup function

const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// Create an HTTP server using the Express app
const server = http.createServer(app);

// Set up Socket.io with the HTTP server
setupSocket(server); // Pass the server to Socket.io for real-time communication

// Define your routes
routes.route(app);

// Start the server
const PORT = 3002;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
