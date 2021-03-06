import { Response } from "express";

export default ({
  res,
  status,
  body,
  headers = { "Content-Type": "application/json" },
}: {
  res: Response;
  status: number;
  body: Object;
  headers?: Object;
}) => {
  return res.status(status).set(headers).send({
    status,
    body,
  });
};
