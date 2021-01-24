"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const celebrate_1 = require("celebrate");
const makeHttpResponse_1 = __importDefault(require("../../helpers/makeHttpResponse"));
const router = express_1.Router();
// Routes Handled in the file
//      /auth/login
//      /auth/register
//      /auth/forget-password
//      /auth/account-activation
exports.default = async (app) => {
    // All auth related routes starts with /auth
    app.use("/auth", router);
    // Routes Handler for login route
    router.post("/login", async (req, res) => {
        makeHttpResponse_1.default({
            res,
            status: 200,
            body: {
                message: "Ho gaya",
            },
        });
    });
    // Routes Handler for register route
    router.post("register", async (req, res) => { });
    app.use(celebrate_1.errors());
};
