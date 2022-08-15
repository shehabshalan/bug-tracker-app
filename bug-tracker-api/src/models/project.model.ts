import mongoose, { Mongoose } from "mongoose";
import { ITicket } from "./ticket.model";
import { IUser } from "./user.model";

export interface IProject extends mongoose.Document {
  projectSlug: string;
  projectName: string;
  projectDescription: string;
  projectMembers?: IUser["_id"][];
  projectTickets?: ITicket["_id"][];
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
