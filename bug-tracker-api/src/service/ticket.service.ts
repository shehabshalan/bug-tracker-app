import { DocumentDefinition } from "mongoose";
import ProjectModel from "../models/project.model";
import TicketModel, { Ticket } from "../models/ticket.model";
import { User } from "../models/user.model";

export const createTicket = async (
  requestBody: DocumentDefinition<Omit<Ticket, "createdAt" | "updatedAt">>,
  user: User
) => {
  try {
    const newTicket = await TicketModel.create({
      ...requestBody,
      ticketAuthor: user._id,
      ticketSlug: user.slug,
    });

    const addTicketToProject = await ProjectModel.findByIdAndUpdate(
      requestBody.ticketProject,
      {
        $push: {
          projectTickets: newTicket._id,
        },
      },
      { new: true }
    );
    return newTicket.toJSON();
  } catch (e: any) {
    throw new Error(e);
  }
};
export const getTickets = async (user: User, limit: number, skip: number) => {
  try {
    let count = await TicketModel.countDocuments({ ticketSlug: user.slug });
    const tickets = await TicketModel.find({ ticketSlug: user.slug })
      .populate("ticketAssignedTo", "-password -__v")
      .populate("ticketAuthor", "-password -__v")
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);
    // .populate("ticketProject", "-__v");
    return { tickets, count };
  } catch (e: any) {
    throw new Error(e);
  }
};

export const getTicket = async (id: string) => {
  try {
    const ticket = await TicketModel.findById(id)
      .populate("ticketAssignedTo", "-password -__v")
      .populate("ticketAuthor", "-password -__v")
      .populate("ticketProject", "-__v");
    return ticket;
  } catch (e: any) {
    throw new Error(e);
  }
};

export const updateTicket = async (
  id: string,
  requestBody: DocumentDefinition<Omit<Ticket, "createdAt" | "updatedAt">>
) => {
  try {
    const ticket = await TicketModel.findByIdAndUpdate(id, requestBody, {
      new: true,
    }).lean();
    return ticket;
  } catch (e: any) {
    throw new Error(e);
  }
};

export const deleteTicket = async (id: string) => {
  try {
    const ticket = await TicketModel.findByIdAndDelete(id);
    return ticket;
  } catch (e: any) {
    throw new Error(e);
  }
};

export const getUserTickets = async (
  id: string,
  limit: number,
  skip: number
) => {
  try {
    let count = await TicketModel.countDocuments({ ticketAuthor: id });
    const userTickets = await TicketModel.find({ ticketAssignedTo: id })
      .populate("ticketAuthor", "-password -__v")
      .populate("ticketProject", "-__v")
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);
    return { userTickets, count };
  } catch (e: any) {
    throw new Error(e);
  }
};

export const getProjectTickets = async (
  id: string,
  limit: number,
  skip: number
) => {
  try {
    let count = await TicketModel.countDocuments({ ticketProject: id });
    const projectTickets = await TicketModel.find({ ticketProject: id })
      .populate("ticketAuthor", "-password -__v")
      .populate("ticketAssignedTo", "-password -__v")
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);
    return { projectTickets, count };
  } catch (e: any) {
    throw new Error(e);
  }
};
