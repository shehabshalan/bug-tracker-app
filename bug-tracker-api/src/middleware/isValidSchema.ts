import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";

// curring function
const isValidSchema =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      });
      next();
    } catch (e: any) {
      return res.status(400).send("Invalid request. Missing required fields");
    }
  };

export default isValidSchema;
