import { Express, Request, Response } from "express";
import { getAccountStatsHandler } from "./controller/account.controller";

import isAuth from "./middleware/isAuth";
import isUser from "./middleware/isUser";

import { projectRoutes } from "./routes/project.routes";
import { authRoutes } from "./routes/auth.routes";
import { ticketRoutes } from "./routes/ticket.routes";
import { userRoutes } from "./routes/user.routes";
import { Route } from "./types/route.types";

const routes = (app: Express) => {
  // health check
  app.get("/api/health", (req: Request, res: Response) => {
    res.status(200).send("API is healthy");
  });
  // account stats
  app.get("/api/stats", [isAuth, isUser], getAccountStatsHandler);

  // auth routes
  authRoutes.forEach((route: Route) => {
    const { path, method, handler, controller } = route;
    app[method](path, handler, controller);
  });

  // user routes with Route interface
  userRoutes.forEach((route: Route) => {
    const { path, method, handler, controller } = route;
    app[method](path, handler, controller);
  });

  // project routes
  projectRoutes.forEach((route: Route) => {
    const { path, method, handler, controller } = route;
    app[method](path, handler, controller);
  });

  // ticket routes
  ticketRoutes.forEach((route: Route) => {
    const { path, method, handler, controller } = route;
    app[method](path, handler, controller);
  });

  // not found
  app.get("*", (req: Request, res: Response) => {
    res.status(404).send("Resource not found");
  });
};

export default routes;
