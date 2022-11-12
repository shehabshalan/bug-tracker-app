import isAuth from "../middleware/isAuth";
import isUser from "../middleware/isUser";
import isValidSchema from "../middleware/isValidSchema";
import {
  createTicketSchema,
  deleteTicketSchema,
  getTicketSchema,
  updateTicketSchema,
} from "../schema/ticket.schema";
import {
  createTicketHandler,
  deleteTicketHandler,
  getProjectTicketsHandler,
  getTicketHandler,
  getTicketsHandler,
  getUserTicketsHandler,
  updateTicketHandler,
} from "../controller/ticket.controller";

export const ticketRoutes = [
  {
    path: "/api/tickets",
    method: "get",
    handler: [isAuth, isUser],
    controller: getTicketsHandler,
  },
  {
    path: "/api/user/tickets",
    method: "get",
    handler: [isAuth, isUser],
    controller: getUserTicketsHandler,
  },
  {
    path: "/api/tickets/:id",
    method: "get",
    handler: [isAuth, isUser, isValidSchema(getTicketSchema)],
    controller: getTicketHandler,
  },
  {
    path: "/api/project/tickets/:id",
    method: "get",
    handler: [isAuth, isUser],
    controller: getProjectTicketsHandler,
  },
  {
    path: "/api/tickets",
    method: "post",

    handler: [isAuth, isUser, isValidSchema(createTicketSchema)],
    controller: createTicketHandler,
  },
  {
    path: "/api/tickets/:id",
    method: "put",
    handler: [isAuth, isUser, isValidSchema(updateTicketSchema)],
    controller: updateTicketHandler,
  },
  {
    path: "/api/tickets/:id",
    method: "delete",

    handler: [isAuth, isUser, isValidSchema(deleteTicketSchema)],
    controller: deleteTicketHandler,
  },
];
