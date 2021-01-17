import winston from "winston";

const LoggerInstance = winston.createLogger({
  level: "info",
  transports: [new winston.transports.Console()],
});

export default LoggerInstance;
