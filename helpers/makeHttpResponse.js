"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ res, status, body, headers = {}, }) => {
    return res.status(status).set(headers).send({
        status,
        body,
    });
};
