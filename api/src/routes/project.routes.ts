import {
  createProjectHandler,
  deleteProjectHandler,
  getProjectHandler,
  getProjectsHandler,
  getRecentProjectsHandler,
  updateProjectHandler,
} from "../controller/project.controller";
import isAuth from "../middleware/isAuth";
import isUser from "../middleware/isUser";
import isValidSchema from "../middleware/isValidSchema";
import {
  createProjectSchema,
  deleteProjectSchema,
  getProjectSchema,
} from "../schema/project.schema";
import { Route } from "../types/route.types";

export const projectRoutes: Route[] = [
  {
    path: "/api/projects",
    method: "get",
    handler: [isAuth, isUser],
    controller: getProjectsHandler,
  },
  {
    path: "/api/projects/:id",
    method: "get",
    handler: [isAuth, isUser, isValidSchema(getProjectSchema)],
    controller: getProjectHandler,
  },
  {
    path: "/api/projects-overview",
    method: "get",
    handler: [isAuth, isUser],
    controller: getRecentProjectsHandler,
  },
  {
    path: "/api/projects",
    method: "post",
    handler: [isAuth, isUser, isValidSchema(createProjectSchema)],
    controller: createProjectHandler,
  },
  {
    path: "/api/projects/:id",
    method: "put",
    handler: [isAuth, isUser],
    controller: updateProjectHandler,
  },
  {
    path: "/api/projects/:id",
    method: "delete",
    handler: [isAuth, isUser, isValidSchema(deleteProjectSchema)],
    controller: deleteProjectHandler,
  },
];
