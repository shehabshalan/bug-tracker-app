export interface Project {
  _id: string;
  projectName: string;
  projectDescription: string;
  projectMembers: string[];
  projectTickets: string[];
  createdAt: string;
  projectSlug: string;
}

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

export interface Ticket {
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

export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}
