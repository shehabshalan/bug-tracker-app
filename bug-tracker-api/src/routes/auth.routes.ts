import {
  createUserSessionHandler,
  deleteSessionHandler,
  getSessionsHandler,
} from "../controller/session.controller";
import {
  createAdminHandler,
  createMemberHandler,
  getAllMembersHandler,
  getMembersHandler,
} from "../controller/user.controller";
import isAuth from "../middleware/isAuth";
import isUser from "../middleware/isUser";
import isAdmin from "../middleware/isAdmin";

import isValidSchema from "../middleware/isValidSchema";
import { createSessionSchema } from "../schema/session.schema";
import { createUserSchema } from "../schema/user.schema";

export const authRoutes = [
  {
    path: "/api/sessions",
    method: "post",
    handler: [isValidSchema(createSessionSchema)],
    controller: createUserSessionHandler,
  },
  {
    path: "/api/sessions",
    method: "get",
    handler: [isAuth, isUser],
    controller: getSessionsHandler,
  },
  {
    path: "/api/sessions",
    method: "delete",
    handler: [isAuth, isUser],
    controller: deleteSessionHandler,
  },

  {
    path: "/api/admin",
    method: "post",
    handler: [isValidSchema(createUserSchema)],
    controller: createAdminHandler,
  },
  {
    path: "/api/members",
    method: "post",
    handler: [isAuth, isUser, isAdmin, isValidSchema(createUserSchema)],
    controller: createMemberHandler,
  },
];
