interface TicketAuthor {
  _id: string;
  name: string;
  email: string;
  role: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

interface TicketAssignedTo {
  _id: string;
  name: string;
  email: string;
  role: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface ITicket {
  _id: string;
  ticketName: string;
  ticketDescription: string;
  ticketType: string;
  ticketStatus: string;
  ticketPriority: string;
  ticketEstimateTimeInHours: number;
  ticketProject: string;
  ticketSlug: string;
  ticketAuthor: TicketAuthor;
  ticketAssignedTo: TicketAssignedTo;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
