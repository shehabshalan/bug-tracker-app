import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";
import ProjectModel from "./project.model";
import TicketModel from "./ticket.model";

export interface User extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  slug: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
  role: string;
}

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "admin",
    },
    slug: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  let user = this as User;
  if (!user.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"));
  const hash = await bcrypt.hashSync(user.password, salt);
  user.password = hash;
  return next();
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  /// because it's async, we need to return a promise of a type in this case boolean
  const user = this as User;
  const isMatch = await bcrypt
    .compare(candidatePassword, user.password)
    .catch(() => false);
  return isMatch;
};

const UserModel = mongoose.model<User>("User", userSchema);
export default UserModel;
