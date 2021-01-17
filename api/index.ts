import express from "express";
import posts from "./routes/posts";

export default () => {
  const app = express();

  posts(app);

  return app;
};
