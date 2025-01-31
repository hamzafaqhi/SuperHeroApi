import { superheroRoutes } from "../modules/superhero/superhero.routes.js";
import xssProtection from "../middlewares/xssProtection.middleware.js";

export const route = (app) => {
  const routePath = "/api/v1";
  app.use(routePath, xssProtection, superheroRoutes);
};
