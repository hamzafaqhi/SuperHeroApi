import request from "supertest";
import express from "express";
import { superheroRoutes } from "../src/modules/superhero/superhero.routes";
import * as superHeroService from "../src/modules/superhero/superhero.service";

// Mock the service methods
jest.mock("../src/modules/superhero/superhero.service");

const app = express();
app.use(express.json());
app.use(superheroRoutes);

superHeroService.superheroes = [];

describe("Superhero Routes", () => {
  beforeEach(() => {
    superHeroService.superheroes = [];
  });

  describe("POST /superheroes", () => {
    it("should create a superhero when valid data is provided", async () => {
      const payload = {
        name: "Iron Man",
        superpower: "Technology",
        humility_score: 5,
      };
      superHeroService.create.mockReturnValue([payload]);
      const response = await request(app).post("/superheroes").send(payload);
      expect(response.status).toBe(200);
      expect(response.body.data).toEqual([payload]);
      expect(superHeroService.create).toHaveBeenCalledWith(payload);
    });

    it("should return an error if the validation fails", async () => {
      const invalidPayload = {
        name: "",
        superpower: "Strength",
        humility_score: 0,
      };

      const response = await request(app)
        .post("/superheroes")
        .send(invalidPayload);

      expect(response.status).toBe(400);
      expect(response.body.error).toBe(true); // Check for error flag
      expect(response.body.data).toHaveProperty("humility_score"); // Check if 'humility_score' exists in the error response
      expect(response.body.data.humility_score).toBe(
        "Humility score must be an integer between 1 and 10"
      );
    });
  });

  describe("GET /superheroes", () => {
    it("should return all superheroes sorted by humilityScore", async () => {
      // Define the superheroes
      const superheroes = [
        { name: "Batman", superpower: "Wealth", humility_score: 3 },
        { name: "Superman", superpower: "Strength", humility_score: 8 },
        { name: "Flash", superpower: "Speed", humility_score: 5 },
      ];

      // Populate the superheroes array manually
      superHeroService.superheroes = superheroes;

      // Mock the `all` method to return the sorted superheroes
      superHeroService.all = jest.fn().mockReturnValue([
        { name: "Superman", superpower: "Strength", humility_score: 8 },
        { name: "Flash", superpower: "Speed", humility_score: 5 },
        { name: "Batman", superpower: "Wealth", humility_score: 3 },
      ]);

      // Send GET request to fetch superheroes
      const response = await request(app).get("/superheroes");

      // Debug the response
      console.log("Full Response:", response.body);

      // Expected sorted superheroes
      const sortedSuperheroes = [
        { name: "Superman", superpower: "Strength", humility_score: 8 },
        { name: "Flash", superpower: "Speed", humility_score: 5 },
        { name: "Batman", superpower: "Wealth", humility_score: 3 },
      ];

      // Assert the status code is 200
      expect(response.status).toBe(200);

      // Assert the response body is as expected
      expect(response.body.data).toEqual(sortedSuperheroes);

      // Ensure the `all` method was called
      expect(superHeroService.all).toHaveBeenCalled();
    });
  });
});
