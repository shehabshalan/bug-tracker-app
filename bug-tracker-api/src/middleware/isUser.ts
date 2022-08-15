import { NextFunction, Request, Response } from "express";
import UserModel from "../models/user.model";

const isUser = async (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user;
  const userId = user._id;

  if (!user) {
    return res.status(403).send("Forbidden");
  }
  try {
    const userExists = await UserModel.findById(userId);
    if (!userExists) {
      return res.status(401).send("Not authorized");
    }
    next();
  } catch (e: any) {
    return res.status(500).send(e.message);
  }
};
export default isUser;
