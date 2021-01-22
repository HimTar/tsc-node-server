import { Router, Request, Response } from "express";
import { celebrate, Joi, errors } from "celebrate";
import sanitizeHtml from "sanitize-html";

import validate from "../../services/posts";
import queries from "../../mongoDB/queries/postsQueries";
import makeHttpResponse from "../../helpers/makeHttpResponse";

const router = Router();

export default async (app: Router) => {
  app.use("/posts", router);

  // Route Handling request for fetching all posts
  router.get("/get-posts", async (req: Request, res: Response) => {
    const mongoRes = await queries.find();

    if (mongoRes.success) {
      makeHttpResponse({ res, status: 200, body: { posts: mongoRes.data } });
    } else {
      makeHttpResponse({ res, status: 500, body: { message: mongoRes.error } });
    }
  });

  // Route Handling request for fetching specific post by title
  router.get("/get-posts/:title", async (req: Request, res: Response) => {
    const queryParams = req.params;
    const mongoRes = await queries.findByTitle(queryParams.title);

    if (mongoRes.success) {
      if (mongoRes.data)
        makeHttpResponse({
          res,
          status: 200,
          body: { posts: mongoRes.data },
        });
      else
        makeHttpResponse({
          res,
          status: 404,
          body: {
            message: `Post with the title ${queryParams.title} does not exist`,
          },
        });
    } else {
      makeHttpResponse({ res, status: 500, body: { message: mongoRes.error } });
    }
  });

  // Route Handling request for adding new post
  router.post(
    "/add-post",
    celebrate({
      body: Joi.object({
        title: Joi.string().required(),
        content: Joi.string().required(),
        author: Joi.string().required(),
      }),
    }),
    async (req: Request, res: Response) => {
      let post = req.body;

      post.content = sanitizeHtml(post.content, {
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

      const validation = await validate(post);

      if (!validation.success) {
        makeHttpResponse({
          res,
          status: 500,
          body: { message: validation.message },
        });
      } else if (!validation.isValid) {
        makeHttpResponse({
          res,
          status: 400,
          body: { message: validation.message },
        });
      } else {
        // The Post is validated and now the data can be saved in database.

        const savingPost = await queries.add(post);

        if (savingPost.success)
          makeHttpResponse({
            res,
            status: 201,
            body: { message: "Post Successfully added" },
          });
        else
          makeHttpResponse({
            res,
            status: 500,
            body: { message: savingPost.error },
          });
      }
    }
  );

  app.use(errors());
};
