import { Express, Request, Response } from "express";
import { getAccountStatsHandler } from "./controller/account.controller";

import isAuth from "./middleware/isAuth";
import isUser from "./middleware/isUser";

import { projectRoutes } from "./routes/project.routes";
import { authRoutes } from "./routes/auth.routes";
import { ticketRoutes } from "./routes/ticket.routes";
import { userRoutes } from "./routes/user.routes";

const routes = (app: Express) => {
  // health check
  app.get("/health", (req: Request, res: Response) => {
    res.sendStatus(200);
  });
  // account stats
  app.get("/api/stats", [isAuth, isUser], getAccountStatsHandler);

  // auth routes
  authRoutes.forEach((route) => {
    const { path, method, handler, controller } = route;
    (app as any)[method](path, handler, controller);
  });

  // user routes
  userRoutes.forEach((route) => {
    const { path, method, handler, controller } = route;
    (app as any)[method](path, handler, controller);
  });

  // project routes
  projectRoutes.forEach((route: any) => {
    const { path, method, handler, controller } = route;
    (app as any)[method](path, handler, controller);
  });

  // ticket routes
  ticketRoutes.forEach((route: any) => {
    const { path, method, handler, controller } = route;
    (app as any)[method](path, handler, controller);
  });

  // not found
  app.get("*", (req: Request, res: Response) => {
    res.status(404).send("Resource not found");
  });
};

export default routes;
