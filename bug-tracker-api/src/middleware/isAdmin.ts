import { NextFunction, Request, Response } from "express";

const isUser = async (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user;
  const userRole = user.role;
  if (userRole !== "admin") {
    return res.status(401).send("Not authorized, you are not an admin");
  }
  next();
};
export default isUser;
