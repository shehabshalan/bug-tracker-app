import mongoose, { Mongoose } from "mongoose";
import { IProject } from "./project.model";
import { IUser } from "./user.model";

export interface ITicket extends mongoose.Document {
  ticketName: string;
  ticketDescription: string;
  ticketType: string;
  ticketPriority: string;
  ticketStatus: string;
  ticketAssignedTo: IUser["_id"];
  ticketAuthor: IUser["_id"];
  ticketProject: IProject["_id"];
  ticketEstimateTimeInHours: number;
  ticketSlug: string;
  createdAt: Date;
  updatedAt: Date;
}

const ticketSchema = new mongoose.Schema(
  {
    ticketName: {
      type: String,
      required: true,
      trim: true,
    },
    ticketDescription: {
      type: String,
      required: true,
      trim: true,
    },
    // ticket type is enum of "bug", "feature", "task"
    ticketType: {
      type: String,
      enum: ["bug", "feature", "task"],
      default: "bug",
    },
    // ticket status is enum of "open", "in progress", "closed"
    ticketStatus: {
      type: String,
      enum: ["open", "in progress", "closed"],
      default: "open",
    },
    // ticket priority is enum of "low", "medium", "high"
    ticketPriority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "low",
    },
    ticketEstimateTimeInHours: {
      type: Number,
      default: 0,
    },
    // ticket project is a reference to the project model
    ticketProject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
    ticketSlug: {
      type: String,
      required: true,
      trim: true,
    },
    // ticket creator is a reference to the user model
    ticketAuthor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    // ticket is assigned to a user - this is a reference to the user model
    ticketAssignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const TicketModel = mongoose.model<ITicket>("Ticket", ticketSchema);
export default TicketModel;
