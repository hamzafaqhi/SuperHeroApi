import {
  successResponse,
  errorResponse,
} from "../../helpers/response.helper.js"; // Import helper functions to handle success and error responses
import * as superHeroService from "./superhero.service.js";
import { getSocketInstance } from "../../connectors/socket.js";
// Controller function to handle retrieving all superheroes
export const index = (req, res, next) => {
  try {
    const response = superHeroService.all();
    return successResponse(req, res, response);
  } catch (error) {
    // If there is an error, return an error response with the error message
    return errorResponse(req, res, error.message, error?.code);
  }
};

// Controller function to handle creating a new superhero
export const create = (req, res) => {
  try {
    // Get the superhero data from the request body
    const payload = req.body;

    const response = superHeroService.create(payload);

    // Retrieve the Socket.io instance to communicate with the clients
    const io = getSocketInstance();

    // Emit an event to all connected clients notifying them of a new superhero
    io.emit("newSuperhero", response);

    return successResponse(req, res, response);
  } catch (error) {
    // If there is an error, return an error response with the error message
    return errorResponse(req, res, error.message, error?.code);
  }
};
