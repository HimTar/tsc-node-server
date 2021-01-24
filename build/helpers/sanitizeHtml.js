"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sanitize_html_1 = __importDefault(require("sanitize-html"));
function default_1(dirtyString) {
    const cleanString = sanitize_html_1.default(dirtyString, {
        allowedTags: [
            "b",
            "i",
            "h1",
            "h2",
            "br",
            "strong",
            "a",
            "p",
            "ol",
            "li",
            "ul",
            "table",
        ],
        allowedAttributes: {
            a: ["href"],
        },
    });
    return cleanString;
}
exports.default = default_1;
