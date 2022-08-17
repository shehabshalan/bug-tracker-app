import { object, string, TypeOf, z } from "zod";
export const createTicketSchema = object({
  body: object({
    ticketName: string({
      required_error: "Title is required",
    }),
    ticketDescription: string({
      required_error: "Description is required",
    }),
    ticketPriority: z.enum(["low", "medium", "high"], {
      required_error: "Priority is required",
    }),
    ticketType: z.enum(["bug", "feature", "task"], {
      required_error: "Type is required",
    }),
    ticketStatus: z.enum(["open", "in progress", "closed"], {
      required_error: "Status is required",
    }),
    ticketEstimateTimeInHours: z.number({
      required_error: "Estimated time is required",
    }),
    ticketAssignedTo: string({
      required_error: "Assigned to is required",
    }).regex(/^[0-9a-fA-F]{24}$/, {
      message: "Assigned to must be a valid MongoDB id",
    }),
    ticketProject: string({
      required_error: "ProjectId is required",
    }).regex(/^[0-9a-fA-F]{24}$/, {
      message: "Project must be a valid MongoDB id",
    }),
  }),
});

export const getTicketSchema = object({
  params: object({
    // Ticket id must match the pattern of a mongo id (24 hex characters)
    id: string().regex(/^[0-9a-fA-F]{24}$/, {
      message: "Ticket id must be a valid MongoDB id",
    }),
  }),
});
export const updateTicketSchema = object({
  params: object({
    // Ticket id must match the pattern of a mongo id (24 hex characters)
    id: string().regex(/^[0-9a-fA-F]{24}$/, {
      message: "Ticket id must be a valid MongoDB id",
    }),
  }),
});

export const deleteTicketSchema = object({
  params: object({
    // Ticket id must match the pattern of a mongo id (24 hex characters)
    id: string().regex(/^[0-9a-fA-F]{24}$/, {
      message: "Ticket id must be a valid MongoDB id",
    }),
  }),
});
export type TicketSchema = TypeOf<typeof createTicketSchema>;
