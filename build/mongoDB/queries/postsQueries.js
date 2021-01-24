"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const postSchema_1 = __importDefault(require("../schemas/postSchema"));
async function add(post) {
    try {
        const newPost = new postSchema_1.default(post);
        await newPost.save();
        return {
            success: true,
        };
    }
    catch (err) {
        return {
            success: false,
            error: "Error querying the database",
        };
    }
}
async function find() {
    try {
        const data = await postSchema_1.default.find();
        return {
            success: true,
            data,
        };
    }
    catch (err) {
        return {
            success: false,
            error: "Error querying the database",
        };
    }
}
async function findByTitle(title) {
    try {
        const data = await postSchema_1.default.findOne({
            title: { $regex: title, $options: "i" },
        });
        return {
            success: true,
            data,
        };
    }
    catch (err) {
        return {
            success: false,
            error: "Error querying the database",
        };
    }
}
async function findAndUpdate(id, post) {
    try {
        const data = await postSchema_1.default.findByIdAndUpdate(id, post);
        if (!data)
            return {
                success: false,
                error: "Invalid Post ID !!",
            };
        return {
            success: true,
        };
    }
    catch (err) {
        return {
            success: false,
            error: "Error querying the database",
        };
    }
}
async function findAndDelete(id) {
    try {
        const data = await postSchema_1.default.findByIdAndDelete(id);
        if (!data)
            return {
                success: false,
                error: "Invalid Post ID !!",
            };
        return {
            success: true,
        };
    }
    catch (err) {
        return {
            success: false,
            error: "Error querying the database",
        };
    }
}
exports.default = Object.freeze({
    add,
    find,
    findByTitle,
    findAndUpdate,
    findAndDelete,
});
