import TicketModel from "../models/ticket.model";
import { User } from "../models/user.model";

export const getAccountStats = async (user: User) => {
  let appStats;
  try {
    if (user.role === "admin") {
      appStats = await TicketModel.find({ ticketSlug: user.slug });
    } else {
      appStats = await TicketModel.find({ ticketAssignedTo: user._id })
        .populate("ticketAuthor", "-password -__v")
        .populate("ticketProject", "-__v");
    }
    const openTicketsCount = appStats.filter(
      (ticket) => ticket.ticketStatus === "open"
    ).length;
    const closedTicketsCount = appStats.filter(
      (ticket) => ticket.ticketStatus === "closed"
    ).length;
    const inProgressTicketsCount = appStats.filter(
      (ticket) => ticket.ticketStatus === "in progress"
    ).length;

    const highPriorityTicketsCount = appStats.filter(
      (ticket) => ticket.ticketPriority === "high"
    ).length;
    const lowPriorityTicketsCount = appStats.filter(
      (ticket) => ticket.ticketPriority === "low"
    ).length;
    const mediumPriorityTicketsCount = appStats.filter(
      (ticket) => ticket.ticketPriority === "medium"
    ).length;

    const bugTicketsCount = appStats.filter(
      (ticket) => ticket.ticketType === "bug"
    ).length;
    const featureTicketsCount = appStats.filter(
      (ticket) => ticket.ticketType === "feature"
    ).length;
    const taskTicketsCount = appStats.filter(
      (ticket) => ticket.ticketType === "task"
    ).length;
    const totalTickets = appStats.length;

    // ticketByType = [0,2,3] => [bug, feature, task]
    const ticketByType = [
      bugTicketsCount,
      featureTicketsCount,
      taskTicketsCount,
    ];
    // ticketByPriority = [0,2,3] => [high, medium, low]
    const ticketByPriority = [
      highPriorityTicketsCount,
      mediumPriorityTicketsCount,
      lowPriorityTicketsCount,
    ];
    // ticketByStatus = [0,2,3] => [open, in progress, closed]
    const ticketByStatus = [
      openTicketsCount,
      inProgressTicketsCount,
      closedTicketsCount,
    ];
    return {
      ticketByType,
      ticketByPriority,
      ticketByStatus,
      totalTickets,
    };
  } catch (e: any) {
    throw new Error(e);
  }
};
