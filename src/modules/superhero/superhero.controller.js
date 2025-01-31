import {
  successResponse,
  errorResponse,
} from "../../helpers/response.helper.js";
import * as superHeroService from "./superhero.service.js";

export const index = (req, res, next) => {
  try {
    const response = superHeroService.all();
    console.log("Response from superHeroService.all():", response);
    return successResponse(req, res, response);
  } catch (error) {
    return errorResponse(req, res, error.message, error?.code);
  }
};

export const create = (req, res) => {
  try {
    const payload = req.body;
    const response = superHeroService.create(payload);
    return successResponse(req, res, response);
  } catch (error) {
    return errorResponse(req, res, error.message, error?.code);
  }
};
