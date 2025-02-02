import {
  successResponse,
  errorResponse,
} from "../../helpers/response.helper.js";
import * as superHeroService from "./superhero.service.js";
import { getSocketInstance } from "../../connectors/socket.js";

export const index = (req, res, next) => {
  try {
    const response = superHeroService.all();
    return successResponse(req, res, response);
  } catch (error) {
    return errorResponse(req, res, error.message, error?.code);
  }
};

export const create = (req, res) => {
  try {
    const payload = req.body;
    const response = superHeroService.create(payload);
    const io = getSocketInstance(); // Retrieve the Socket.io instance
    io.emit("newSuperhero", response);
    return successResponse(req, res, response);
  } catch (error) {
    return errorResponse(req, res, error.message, error?.code);
  }
};
