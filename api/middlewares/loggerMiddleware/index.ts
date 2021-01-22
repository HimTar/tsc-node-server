import { Request, Response, NextFunction } from "express";
import logger from "../../../loaders/logger";

export default function LoggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.info(`Logged  ${req.url}  ${req.method} -- ${new Date()}`);
  next();
}
