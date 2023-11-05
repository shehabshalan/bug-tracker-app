import { Request, Response } from "express";
import { getAccountStats } from "../service/account.service";

export const getAccountStatsHandler = async (req: Request, res: Response) => {
  const user = res.locals.user;
  try {
    const stats = await getAccountStats(user);

    return res.status(200).json({
      status: "success",
      result: stats,
    });
  } catch (e) {
    return res.status(500).json(e);
  }
};
