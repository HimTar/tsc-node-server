"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../../../loaders/logger"));
function LoggerMiddleware(req, res, next) {
    logger_1.default.info(`Logged  ${req.url}  ${req.method} -- ${new Date()}`);
    next();
}
exports.default = LoggerMiddleware;
