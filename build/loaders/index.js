"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("./express"));
const mongoDB_1 = __importDefault(require("../mongoDB"));
const logger_1 = __importDefault(require("./logger"));
exports.default = async ({ expressApp }) => {
    express_1.default(expressApp);
    logger_1.default.info("Express loaded");
    expressApp.use((err, req, res, next) => {
        console.log("Error : \n", err);
    });
    //await authLoader(expressApp);
    const dbConnection = await mongoDB_1.default();
    if (dbConnection) {
        logger_1.default.info("Database Successfully Connnected !!");
    }
    else {
        logger_1.default.error("Error Connecting Database !!!");
    }
};
