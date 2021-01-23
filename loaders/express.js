"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const api_1 = __importDefault(require("../api"));
const makeHttpResponse_1 = __importDefault(require("../helpers/makeHttpResponse"));
const expressLoader = (app) => {
    // Health Check endpoints
    app.get("/status", (req, res) => {
        res.status(200).end();
    });
    app.head("/status", (req, res) => {
        res.status(200).end();
    });
    // CORS Configuration
    app.use(cors_1.default());
    // BodyParser Configuration
    app.use(express_1.default.json());
    // Configuring API Routes
    app.use("/api", api_1.default());
    // Catching 404 and forwarding to error handler
    app.use((req, res, next) => {
        makeHttpResponse_1.default({
            res,
            status: 404,
            body: { message: "Endpoint Does Not Exist !!!" },
        });
    });
};
exports.default = expressLoader;
