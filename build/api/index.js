"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const posts_1 = __importDefault(require("./routes/posts"));
const loggerMiddleware_1 = __importDefault(require("./middlewares/loggerMiddleware"));
exports.default = () => {
    const app = express_1.default();
    app.use(loggerMiddleware_1.default);
    posts_1.default(app);
    return app;
};
