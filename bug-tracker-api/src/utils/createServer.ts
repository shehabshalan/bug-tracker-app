import express from "express";
import cors, { CorsOptions } from "cors";
import routes from "../routes";
import corsOptions from "./corsOptions";

function createServer() {
  const app = express();

  app.use(cors(corsOptions as CorsOptions));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  routes(app);

  return app;
}

export default createServer;
