import {
  getAllMembersHandler,
  getMembersHandler,
} from "../controller/user.controller";
import isAuth from "../middleware/isAuth";
import isUser from "../middleware/isUser";
import { Route } from "../types/route.types";

export const userRoutes: Route[] = [
  {
    path: "/api/members",
    method: "get",
    handler: [isAuth, isUser],
    controller: getMembersHandler,
  },
  {
    path: "/api/allmembers",
    method: "get",
    handler: [isAuth, isUser],
    controller: getAllMembersHandler,
  },
];
