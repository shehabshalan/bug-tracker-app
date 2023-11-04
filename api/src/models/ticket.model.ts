import mongoose, { Mongoose } from "mongoose";
import { Project } from "./project.model";
import { User } from "./user.model";

export interface Ticket extends mongoose.Document {
  ticketName: string;
  ticketDescription: string;
  ticketType: string;
  ticketPriority: string;
  ticketStatus: string;
  ticketAssignedTo: User["_id"];
  ticketAuthor: User["_id"];
  ticketProject: Project["_id"];
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

const TicketModel = mongoose.model<Ticket>("Ticket", ticketSchema);
export default TicketModel;
