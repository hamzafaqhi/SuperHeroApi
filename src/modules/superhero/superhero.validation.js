import { body, validationResult } from "express-validator";
import * as responseHelper from "../../helpers/response.helper.js";

// Validation middleware for creating a superhero
export const create_superhero_validation = [
  // Validate the "name" field
  body("name")
    .isString() // Name must be a string
    .withMessage("Name must be a string") // Custom error message if not a string
    .notEmpty() // Ensure the name is not empty
    .withMessage("Name is required"), // Custom error message if empty

  // Validate the "superpower" field
  body("superpower")
    .isString() // Superpower must be a string
    .withMessage("Superpower must be a string") // Custom error message if not a string
    .notEmpty() // Ensure the superpower is not empty
    .withMessage("Superpower is required"), // Custom error message if empty

  // Validate the "humility_score" field
  body("humility_score")
    .isInt({ min: 1, max: 10 }) // Humility score must be an integer between 1 and 10
    .withMessage("Humility score must be an integer between 1 and 10") // Custom error message if it's out of range
    .notEmpty() // Ensure the humility score is not empty
    .withMessage("Humility score is required"), // Custom error message if empty

  // Custom error handling middleware
  (req, res, next) => {
    const errors = validationResult(req);

    // If there are validation errors, return them in the response
    if (!errors.isEmpty()) {
      return responseHelper.validationErrorCreation(res, errors, next);
    }

    // If no errors, proceed to the next middleware or route handler
    next();
  },
];
