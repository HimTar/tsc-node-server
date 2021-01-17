import { Response } from "express";

export default ({
  res,
  status,
  body,
}: {
  res: Response;
  status: number;
  body: Object;
}) => {
  return res.status(status).json({
    status,
    body,
  });
};
