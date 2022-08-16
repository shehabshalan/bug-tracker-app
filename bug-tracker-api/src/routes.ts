import { Express, Request, Response } from "express";
import { getAccountStatsHandler } from "./controller/account.controller";
import {
  createProjectHandler,
  deleteProjectHandler,
  getProjectHandler,
  getProjectsHandler,
  getTopFourProjectsWithMostMembersHandler,
  updateProjectHandler,
} from "./controller/project.controller";
import {
  createUserSessionHandler,
  deleteSessionHandler,
  getSessionsHandler,
} from "./controller/session.controller";
import {
  createTicketHandler,
  deleteTicketHandler,
  getProjectTicketsHandler,
  getTicketHandler,
  getTicketsHandler,
  getUserTicketsHandler,
  updateTicketHandler,
} from "./controller/ticket.controller";
import {
  createAdminHandler,
  createMemberHandler,
  getAllMembersHandler,
  getMembersHandler,
} from "./controller/user.controller";
import isAdmin from "./middleware/isAdmin";
import isAuth from "./middleware/isAuth";
import isUser from "./middleware/isUser";
import isValidSchema from "./middleware/isValidSchema";
import {
  createProjectSchema,
  deleteProjectSchema,
  getProjectSchema,
} from "./schema/project.schema";
import { createSessionSchema } from "./schema/session.schema";
import {
  createTicketSchema,
  deleteTicketSchema,
  getTicketSchema,
  updateTicketSchema,
} from "./schema/ticket.schema";
import { createUserSchema } from "./schema/user.schema";
import { getProjectTickets } from "./service/ticket.service";

const routes = (app: Express) => {
  // health check
  app.get("/health", (req: Request, res: Response) => {
    res.sendStatus(200);
  });

  // auth routes
  app.post(
    "/api/admin",

    isValidSchema(createUserSchema),
    createAdminHandler
  );
  app.post(
    "/api/members",

    [isAuth, isUser, isAdmin, isValidSchema(createUserSchema)],
    createMemberHandler
  );

  app.get("/api/members", [isAuth, isUser], getMembersHandler);
  app.get("/api/allmembers", [isAuth, isUser], getAllMembersHandler);

  app.post(
    "/api/sessions",
    isValidSchema(createSessionSchema),
    createUserSessionHandler
  );

  app.get("/api/sessions", [isAuth, isUser], getSessionsHandler);

  app.delete("/api/sessions", [isAuth, isUser], deleteSessionHandler);

  // account stats
  app.get("/api/stats", [isAuth, isUser], getAccountStatsHandler);

  // project routes

  app.get("/api/projects", [isAuth, isUser], getProjectsHandler);
  app.get(
    "/api/projects/:id",
    [isAuth, isUser, isValidSchema(getProjectSchema)],
    getProjectHandler
  );
  app.get(
    "/api/projects-overview",
    [isAuth, isUser],
    getTopFourProjectsWithMostMembersHandler
  );
  app.post(
    "/api/projects",
    [isAuth, isUser, isValidSchema(createProjectSchema)],
    createProjectHandler
  );

  app.put("/api/projects/:id", [isAuth, isUser], updateProjectHandler);
  app.delete(
    "/api/projects/:id",
    [isAuth, isUser, isValidSchema(deleteProjectSchema)],
    deleteProjectHandler
  );

  // ticket routes
  app.get("/api/tickets", [isAuth, isUser], getTicketsHandler);
  app.get("/api/user/tickets", [isAuth, isUser], getUserTicketsHandler);
  app.get(
    "/api/tickets/:id",
    [isAuth, isUser, isValidSchema(getTicketSchema)],
    getTicketHandler
  );
  app.get(
    "/api/project-tickets/:id",
    [isAuth, isUser],
    getProjectTicketsHandler
  );
  app.post(
    "/api/tickets",
    [isAuth, isUser, isValidSchema(createTicketSchema)],
    createTicketHandler
  );
  app.put(
    "/api/tickets/:id",
    [isAuth, isUser, isValidSchema(updateTicketSchema)],
    updateTicketHandler
  );
  app.delete(
    "/api/tickets/:id",
    [isAuth, isUser, isValidSchema(deleteTicketSchema)],
    deleteTicketHandler
  );

  // not found
  app.get("*", (req: Request, res: Response) => {
    res.status(404).send("Resource not found");
  });
};

export default routes;
