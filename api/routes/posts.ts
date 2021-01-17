import { Router, Request, Response } from "express";
import makeHttpResponse from "../../helpers/makeHttpResponse";

const router = Router();

export default async (app: Router) => {
  app.use("/posts", router);

  router.get("/", async (req: Request, res: Response) => {
    makeHttpResponse({ res, status: 200, body: { message: "Success" } });
  });
};
