import mongoose, { Mongoose } from "mongoose";
import { User } from "./user.model";

export interface Session extends mongoose.Document {
  user: User["_id"];
  valid: boolean;
  userAgent: string;
  createdAt: Date;
  updatedAt: Date;
}

const sessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    valid: {
      type: Boolean,
      default: true,
    },
    userAgent: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const SessionModel = mongoose.model<Session>("Session", sessionSchema);
export default SessionModel;
