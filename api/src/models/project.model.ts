import mongoose, { Mongoose } from "mongoose";
import TicketModel, { Ticket } from "./ticket.model";
import { User } from "./user.model";

export interface Project extends mongoose.Document {
  projectSlug: string;
  projectName: string;
  projectDescription: string;
  projectMembers?: User["_id"][];
  projectTickets?: Ticket["_id"][];
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new mongoose.Schema(
  {
    projectSlug: {
      type: String,
      trim: true,
    },
    projectName: {
      type: String,
      required: true,
      trim: true,
    },
    projectDescription: {
      type: String,
      required: true,
      trim: true,
    },
    // a project has members who are users  - this is a reference to the user model
    projectMembers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    // a project has tickets - this is a reference to the ticket model
    projectTickets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ticket",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const ProjectModel = mongoose.model("Project", projectSchema);
export default ProjectModel;
