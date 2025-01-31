import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import * as routes from "./routes.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());
routes.route(app);

export default app;
