import {
  getAllMembersHandler,
  getMembersHandler,
} from "../controller/user.controller";
import isAuth from "../middleware/isAuth";
import isUser from "../middleware/isUser";

export const userRoutes = [
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
