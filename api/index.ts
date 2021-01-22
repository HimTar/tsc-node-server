import express from "express";
import posts from "./routes/posts";
import LoggerMiddleware from "./middlewares/loggerMiddleware";

export default () => {
  const app = express();

  app.use(LoggerMiddleware);

  posts(app);

  return app;
};
