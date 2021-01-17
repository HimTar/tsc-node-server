import express from "express";
import logger from "./loaders/logger";

const startServer = async () => {
  const app = express();

  await require("./loaders").default({ expressApp: app });

  const port = process.env.PORT || 8080;
  app.listen(port, () => {
    logger.info(`Sever listening on PORT ${port}`);
  });
};

startServer();
