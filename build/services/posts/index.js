"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const postsQueries_1 = __importDefault(require("../../mongoDB/queries/postsQueries"));
exports.default = async (post, isEdit = false) => {
    try {
        if (!post.title) {
            return {
                success: false,
                isValid: false,
                message: "Title field can't be empty",
            };
        }
        if (!post.content) {
            return {
                success: false,
                isValid: false,
                message: "Content field can't be empty",
            };
        }
        if (!post.author) {
            return {
                success: false,
                isValid: false,
                message: "Author field can't be empty",
            };
        }
        if (!isEdit) {
            const response = await checkUnique(post);
            return response;
        }
        else {
            return {
                success: true,
                isValid: true,
            };
        }
    }
    catch (err) {
        return {
            success: false,
            isValid: false,
            message: "Error querying the database !!!",
        };
    }
};
const checkUnique = async (post) => {
    const response = await postsQueries_1.default.findByTitle(post.title);
    if (response.success) {
        if (response.data)
            return {
                success: true,
                isValid: false,
                message: `Another post already exists with title "${post.title}"`,
            };
        return {
            success: true,
            isValid: true,
        };
    }
    else {
        throw new Error();
    }
};
