import { Request, Response } from "express";
import { validateUserPassword } from "../service/user.service";
import {
  createSession,
  getSessions,
  updateSession,
} from "../service/session.service";
import { signJwt } from "../utils/jwt";
import config from "config";
export const createUserSessionHandler = async (req: Request, res: Response) => {
  try {
    // validate the user's password
    const user = await validateUserPassword(req.body);
    if (!user) {
      return res.status(401).send("Invalid email or password");
    }

    // create a session for the user
    const session = await createSession(user._id, req.get("user-agent") || "");

    // create an access token for the user

    const accessToken = signJwt(
      { ...user, session: session._id },
      { expiresIn: config.get("accessTokenTtl") }
    );
    // create a refresh token for the user
    const refreshToken = signJwt(
      { ...user, session: session._id },
      { expiresIn: config.get("refreshTokenTtl") }
    );
    // return the user and the access toke and refresh token
    return res.send({
      accessToken,
      refreshToken,
    });
  } catch (e: any) {
    return res.status(500).send(e.message);
  }
};

export const getSessionsHandler = async (req: Request, res: Response) => {
  const userId = res.locals.user._id;

  try {
    const sessions = await getSessions({ user: userId, valid: true });
    return res.send();
  } catch (e: any) {
    return res.status(500).send(e.message);
  }
};

export const deleteSessionHandler = async (req: Request, res: Response) => {
  const sessionId = res.locals.user.session;

  await updateSession({ _id: sessionId }, { valid: false });

  return res.send({
    accessToken: null,
    refreshToken: null,
  });
};
