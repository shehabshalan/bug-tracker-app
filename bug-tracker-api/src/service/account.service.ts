import TicketModel from "../models/ticket.model";
import { IUser } from "../models/user.model";

export const getAccountStats = async (user: IUser) => {
  try {
    const appStats = await TicketModel.find({ ticketSlug: user.slug });
    // count how many open tickets there are
    const openTickets = appStats.filter(
      (ticket) => ticket.ticketStatus === "open"
    );
    const openTicketsCount = openTickets.length;
    // count how many closed tickets there are
    const closedTickets = appStats.filter(
      (ticket) => ticket.ticketStatus === "closed"
    );
    const closedTicketsCount = closedTickets.length;
    // count how many in progress tickets there are
    const inProgressTickets = appStats.filter(
      (ticket) => ticket.ticketStatus === "in progress"
    );
    const inProgressTicketsCount = inProgressTickets.length;

    // count how many ticket high priority tickets there are and how many low priority tickets there are and how many medium priority tickets there are
    const highPriorityTickets = appStats.filter(
      (ticket) => ticket.ticketPriority === "high"
    );
    const highPriorityTicketsCount = highPriorityTickets.length;
    const lowPriorityTickets = appStats.filter(
      (ticket) => ticket.ticketPriority === "low"
    );
    const lowPriorityTicketsCount = lowPriorityTickets.length;
    const mediumPriorityTickets = appStats.filter(
      (ticket) => ticket.ticketPriority === "medium"
    );
    const mediumPriorityTicketsCount = mediumPriorityTickets.length;

    // count how many bug tickets there are and how many feature tickets there are and how many task tickets there are
    const bugTickets = appStats.filter((ticket) => ticket.ticketType === "bug");
    const bugTicketsCount = bugTickets.length;
    const featureTickets = appStats.filter(
      (ticket) => ticket.ticketType === "feature"
    );
    const featureTicketsCount = featureTickets.length;
    const taskTickets = appStats.filter(
      (ticket) => ticket.ticketType === "task"
    );
    const taskTicketsCount = taskTickets.length;
    // count
    // count how many tickets there are
    const totalTickets = appStats.length;
    return {
      openTicketsCount,
      closedTicketsCount,
      inProgressTicketsCount,
      highPriorityTicketsCount,
      lowPriorityTicketsCount,
      mediumPriorityTicketsCount,
      bugTicketsCount,
      featureTicketsCount,
      taskTicketsCount,
      totalTickets,
    };
  } catch (e: any) {
    throw new Error(e);
  }
};
