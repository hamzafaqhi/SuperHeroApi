import express from "express";
import * as superheroController from "./superhero.controller.js";
import { create_superhero_validation } from "./superhero.validation.js";

// Defining the base route for superheroes
const resource = "/superheroes";

// Creating an Express Router instance to define routes
export const superheroRoutes = express.Router();

// GET route for fetching all superheroes
superheroRoutes.get(`${resource}`, superheroController.index);

// POST route for creating a new superhero
superheroRoutes.post(
  `${resource}`,
  create_superhero_validation, // Input validation middleware
  superheroController.create // Controller function to handle superhero creation
);
