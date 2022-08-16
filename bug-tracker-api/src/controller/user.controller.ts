import { Request, Response } from "express";

import {
  createAdmin,
  createMember,
  getAllMembers,
  getMembers,
} from "../service/user.service";
import logger from "../utils/logger";
export const createAdminHandler = async (req: Request, res: Response) => {
  try {
    const user = await createAdmin(req.body);
    return res.send(user);
  } catch (e: any) {
    logger.error(e.message);
    return res.status(409).send(e.message);
  }
};

export const createMemberHandler = async (req: Request, res: Response) => {
  const admin = res.locals.user;
  try {
    const user = await createMember(req.body, admin);
    return res.send(user);
  } catch (e: any) {
    logger.error(e.message);
    return res.status(409).send(e.message);
  }
};

export const getMembersHandler = async (req: Request, res: Response) => {
  const admin = res.locals.user;
  const { page = 1, size = 10 }: { page?: number; size?: number } = req.query;
  const limit = size;
  const skip = (page - 1) * size;
  try {
    const { members, count } = await getMembers(admin, limit, skip);
    return res.status(200).json({
      status: "success",
      totalPages: Math.ceil(count / limit),
      page,
      result: members,
    });
  } catch (e: any) {
    logger.error(e.message);
    return res.status(409).send(e.message);
  }
};
export const getAllMembersHandler = async (req: Request, res: Response) => {
  const admin = res.locals.user;
  try {
    const members = await getAllMembers(admin);
    return res.status(200).json({
      status: "success",
      result: members,
    });
  } catch (e: any) {
    logger.error(e.message);
    return res.status(409).send(e.message);
  }
};
