import express from "express";
import posts from "./routes/posts";
import contact from "./routes/contact";
import LoggerMiddleware from "./middlewares/loggerMiddleware";

export default () => {
  const app = express();

  app.use(LoggerMiddleware);

  posts(app);
  contact(app);

  return app;
};
