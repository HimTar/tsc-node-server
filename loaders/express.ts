import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import routes from "../api";
import makeHttpResponse from "../helpers/makeHttpResponse";
const expressLoader = (app: express.Application) => {
  // Health Check endpoints

  app.get("/status", (req, res) => {
    res.status(200).end();
  });
  app.head("/status", (req, res) => {
    res.status(200).end();
  });

  // CORS Configuration

  app.use(cors());

  // BodyParser Configuration

  app.use(express.json());

  // Configuring API Routes

  app.use("/api", routes());

  // Catching 404 and forwarding to error handler

  app.use((req, res, next) => {
    makeHttpResponse({
      res,
      status: 404,
      body: { message: "Endpoint Not Allowed !!!" },
    });
  });
};

export default expressLoader;
