"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
    },
    full_name: {
        type: String,
        required: [true, "Name is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    region: {
        country: String,
        city: String,
    },
    profile_image: {
        url: String,
        public_id: String,
    },
    status: {
        type: String,
        default: "deactive",
    },
    myPosts: [String],
}, { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } });
const UserModel = mongoose_1.default.model("UserModel", UserSchema);
exports.default = UserModel;
