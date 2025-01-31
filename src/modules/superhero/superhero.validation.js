import { body, validationResult } from "express-validator";
import * as responseHelper from "../../helpers/response.helper.js";

export const create_superhero_validation = [
  body("name")
    .isString()
    .withMessage("Name must be a string")
    .notEmpty()
    .withMessage("Name is required"),
  body("superpower")
    .isString()
    .withMessage("Superpower must be a string")
    .notEmpty()
    .withMessage("Superpower is required"),
  body("humility_score")
    .isInt({ min: 1, max: 10 })
    .withMessage("Humility score must be an integer between 1 and 10")
    .notEmpty()
    .withMessage("Humility score is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return responseHelper.validationErrorCreation(res, errors, next);
    }
    next();
  },
];
