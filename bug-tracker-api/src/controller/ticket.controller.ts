import { Request, Response } from "express";
import {
  createTicket,
  deleteTicket,
  getTicket,
  getTickets,
  getUserTickets,
  updateTicket,
} from "../service/ticket.service";

export const createTicketHandler = async (req: Request, res: Response) => {
  const user = res.locals.user;
  try {
    const project = await createTicket(req.body, user);
    return res.status(201).json(project);
  } catch (e) {
    return res.status(500).json(e);
  }
};
export const getTicketsHandler = async (req: Request, res: Response) => {
  const user = res.locals.user;
  const { page = 1, size = 10 }: { page?: number; size?: number } = req.query;
  const limit = size;
  const skip = (page - 1) * size;
  try {
    const { tickets, count } = await getTickets(user, limit, skip);
    return res.status(200).json({
      status: "success",
      totalPages: Math.ceil(count / limit),
      page,
      result: tickets,
    });
  } catch (e: any) {
    return res.status(500).json(e.message);
  }
};

export const getTicketHandler = async (req: Request, res: Response) => {
  const ticketId = req.params.id;
  try {
    const ticket = await getTicket(ticketId);
    if (!ticket) {
      return res
        .status(404)
        .json({ message: `Ticket with ${ticket} was not found` });
    }
    return res.status(200).json(ticket);
  } catch (e: any) {
    return res.status(500).json(e.message);
  }
};

export const updateTicketHandler = async (req: Request, res: Response) => {
  const ticketId = req.params.id;
  try {
    const updatedTicket = await updateTicket(ticketId, req.body);
    if (!updatedTicket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    return res.status(203).json(updatedTicket);
  } catch (e: any) {
    return res.status(500).json(e.message);
  }
};

export const deleteTicketHandler = async (req: Request, res: Response) => {
  const ticketId = req.params.id;
  try {
    const ticket = await deleteTicket(ticketId);
    if (!ticket) {
      return res
        .status(404)
        .json({ message: `Ticket with ${ticketId} was not found` });
    }
    return res.status(200).json({ message: "Ticket deleted" });
  } catch (e: any) {
    return res.status(500).json(e.message);
  }
};

export const getUserTicketsHandler = async (req: Request, res: Response) => {
  const userId = res.locals.user._id;
  const { page = 1, size = 10 }: { page?: number; size?: number } = req.query;
  const limit = size;
  const skip = (page - 1) * size;
  try {
    const { userTickets, count } = await getUserTickets(userId, limit, skip);
    return res.status(200).json({
      status: "success",
      totalPage: Math.ceil(count / limit),
      page,
      result: userTickets,
    });
  } catch (e: any) {
    return res.status(500).json(e.message);
  }
};
