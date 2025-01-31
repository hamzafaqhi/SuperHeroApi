import express from "express";
import * as superheroController from "./superhero.controller.js";
import { create_superhero_validation } from "./superhero.validation.js";

const resource = "/superheroes";

export const superheroRoutes = express.Router();

superheroRoutes.get(`${resource}`, superheroController.index);
superheroRoutes.post(
  `${resource}`,
  create_superhero_validation,
  superheroController.create
);
