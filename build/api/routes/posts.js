"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const celebrate_1 = require("celebrate");
const posts_1 = __importDefault(require("../../services/posts"));
const postsQueries_1 = __importDefault(require("../../mongoDB/queries/postsQueries"));
const sanitizeHtml_1 = __importDefault(require("../../helpers/sanitizeHtml"));
const makeHttpResponse_1 = __importDefault(require("../../helpers/makeHttpResponse"));
const router = express_1.Router();
exports.default = async (app) => {
    // All posts related routes starts with /posts
    app.use("/posts", router);
    // Route Handling request for fetching all posts
    router.get("/get-posts", async (req, res) => {
        const mongoRes = await postsQueries_1.default.find();
        if (mongoRes.success) {
            makeHttpResponse_1.default({ res, status: 200, body: { posts: mongoRes.data } });
        }
        else {
            makeHttpResponse_1.default({ res, status: 500, body: { message: mongoRes.error } });
        }
    });
    // Route Handling request for fetching specific post by title
    router.get("/get-posts/:title", async (req, res) => {
        const queryParams = req.params;
        const mongoRes = await postsQueries_1.default.findByTitle(queryParams.title);
        if (mongoRes.success) {
            if (mongoRes.data)
                makeHttpResponse_1.default({
                    res,
                    status: 200,
                    body: { posts: mongoRes.data },
                });
            else
                makeHttpResponse_1.default({
                    res,
                    status: 404,
                    body: {
                        message: `Post with the title ${queryParams.title} does not exist`,
                    },
                });
        }
        else {
            makeHttpResponse_1.default({ res, status: 500, body: { message: mongoRes.error } });
        }
    });
    // Route Handling request for adding new post
    router.post("/add-post", celebrate_1.celebrate({
        body: celebrate_1.Joi.object({
            title: celebrate_1.Joi.string().required(),
            content: celebrate_1.Joi.string().required(),
            author: celebrate_1.Joi.string().required(),
        }),
    }), async (req, res) => {
        let post = req.body;
        post.content = sanitizeHtml_1.default(post.content);
        const validation = await posts_1.default(post);
        if (!validation.success) {
            makeHttpResponse_1.default({
                res,
                status: 500,
                body: { message: validation.message },
            });
        }
        else if (!validation.isValid) {
            makeHttpResponse_1.default({
                res,
                status: 400,
                body: { message: validation.message },
            });
        }
        else {
            // The Post is validated and now the data can be saved in database.
            const savingPost = await postsQueries_1.default.add(post);
            if (savingPost.success)
                makeHttpResponse_1.default({
                    res,
                    status: 201,
                    body: { message: "Post Successfully added" },
                });
            else
                makeHttpResponse_1.default({
                    res,
                    status: 500,
                    body: { message: savingPost.error },
                });
        }
    });
    // Route Handling request for editing old post
    router.post("/edit-post", celebrate_1.celebrate({
        body: celebrate_1.Joi.object({
            id: celebrate_1.Joi.string().required(),
            data: {
                title: celebrate_1.Joi.string().required(),
                content: celebrate_1.Joi.string().required(),
                author: celebrate_1.Joi.string().required(),
            },
        }),
    }), async (req, res) => {
        let post = req.body;
        post.data.content = sanitizeHtml_1.default(post.data.content);
        const validation = await posts_1.default(post.data, true);
        if (!validation.success) {
            makeHttpResponse_1.default({
                res,
                status: 500,
                body: { message: validation.message },
            });
        }
        else if (!validation.isValid) {
            makeHttpResponse_1.default({
                res,
                status: 400,
                body: { message: validation.message },
            });
        }
        else {
            // The Post is validated and now the data can be saved in database.
            const savingPost = await postsQueries_1.default.findAndUpdate(post.id, post.data);
            if (savingPost.success)
                makeHttpResponse_1.default({
                    res,
                    status: 200,
                    body: { message: "Post Successfully Updated" },
                });
            else
                makeHttpResponse_1.default({
                    res,
                    status: 500,
                    body: { message: savingPost.error },
                });
        }
    });
    // Route Handling request for deleting post
    router.post("/delete-post", celebrate_1.celebrate({
        body: celebrate_1.Joi.object({
            id: celebrate_1.Joi.string().required(),
        }),
    }), async (req, res) => {
        const id = req.body.id;
        const deletePost = await postsQueries_1.default.findAndDelete(id);
        if (deletePost.success)
            makeHttpResponse_1.default({
                res,
                status: 200,
                body: { message: "Post Successfully Deleted" },
            });
        else
            makeHttpResponse_1.default({
                res,
                status: 500,
                body: { message: deletePost.error },
            });
    });
    app.use(celebrate_1.errors());
};
