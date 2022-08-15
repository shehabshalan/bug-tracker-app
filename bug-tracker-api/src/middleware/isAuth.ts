import { NextFunction, Request, Response } from "express";
import { get } from "lodash";
import { reIssueAccessToken } from "../service/session.service";
import { verifyJwt } from "../utils/jwt";
const isAuth = async (req: Request, res: Response, next: NextFunction) => {
  let accessToken = get(req, "headers.authorization");
  if (!accessToken) {
    return res.status(401).send("Unauthorized");
  }

  let refreshToken = get(req, "headers.x-refresh");
  try {
    accessToken = accessToken.replace("Bearer ", "");
    const { decoded, expired } = verifyJwt(accessToken);

    if (decoded) {
      res.locals.user = decoded;
      return next();
    }

    if (expired && refreshToken) {
      const newAccessToken = await reIssueAccessToken({ refreshToken });

      if (newAccessToken) {
        res.setHeader("x-access-token", newAccessToken);
      }
      if (!newAccessToken) {
        return res.status(401).send("Refresh token expired");
      }

      const result = verifyJwt(newAccessToken);

      res.locals.user = result.decoded;
      return next();
    }

    return res.status(401).send("Unauthorized ");
  } catch (e: any) {
    return res.status(500).send(e.message);
  }
};
export default isAuth;
