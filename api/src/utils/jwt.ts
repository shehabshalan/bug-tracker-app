import jwt from "jsonwebtoken";
import config from "config";

const secretKey = config.get<string>("accessTokenSecret");
export const signJwt = (
  object: Object,
  options?: jwt.SignOptions | undefined
) => {
  try {
    return jwt.sign(object, secretKey, {
      ...(options && options),
    });
  } catch (e: any) {
    throw new Error(e);
  }
};

export const verifyJwt = (token: string) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (e: any) {
    return {
      valid: false,
      expired: e.message === "jwt expired",
      decoded: null,
    };
  }
};
