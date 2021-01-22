import { Application, Request, Response, NextFunction } from "express";
import expressLoader from "./express";
import makeConnection from "../mongoDB";
import logger from "./logger";

export default async ({ expressApp }: { expressApp: Application }) => {
  expressLoader(expressApp);
  logger.info("Express loaded");

  expressApp.use(
    (err: Error, req: Request, res: Response, next: NextFunction) => {
      console.log("Error : \n", err);
    }
  );

  //await authLoader(expressApp);

  const dbConnection = await makeConnection();

  if (dbConnection) {
    logger.info("Database Successfully Connnected !!");
  } else {
    logger.error("Error Connecting Database !!!");
  }
};
