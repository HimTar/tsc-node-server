import { Application } from "express";
import expressLoader from "./express";
import makeConnection from "../mongoDB";
import logger from "./logger";

export default async ({ expressApp }: { expressApp: Application }) => {
  await expressLoader(expressApp);
  logger.info("Express loaded");

  const dbConnection = await makeConnection();

  if (dbConnection) {
    logger.info("Database Successfully Connnected !!");
  } else {
    logger.error("Error Connecting Database !!!");
  }
};
