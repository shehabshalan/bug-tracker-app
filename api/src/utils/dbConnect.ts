import mongoose from "mongoose";
import config from "config";
import logger from "./logger";

const dbConnect = async () => {
  const MONGODB_URI = config.get<string>("mongoURI");
  try {
    await mongoose.connect(MONGODB_URI);
    logger.info("MongoDB connected");
  } catch (e: any) {
    logger.error(e.message);
    process.exit(1);
  }
};
export default dbConnect;
