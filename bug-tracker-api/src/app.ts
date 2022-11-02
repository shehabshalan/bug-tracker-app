import express from "express";
import config from "config";
import dbConnect from "./utils/dbConnect";
import logger from "./utils/logger";
import createServer from "./utils/createServer";

require("dotenv").config();

const PORT = config.get<number>("port");

const app = createServer();

app.listen(PORT, async () => {
  logger.info(`Api is running at port ${PORT}`);
  await dbConnect();
});
