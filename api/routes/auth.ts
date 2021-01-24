import { Request, Response, Router } from "express";
import { celebrate, Joi, errors } from "celebrate";
import axios from "axios";

import makeHttpResponse from "../../helpers/makeHttpResponse";

const router = Router();

// Routes Handled in the file
//      /auth/login
//      /auth/register
//      /auth/forget-password
//      /auth/account-activation

export default async (app: Router) => {
  // All auth related routes starts with /auth

  app.use("/auth", router);

  // Routes Handler for login route

  router.post(
    "/login",
    celebrate({
      body: Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
      }),
    }),
    async (req: Request, res: Response) => {
      makeHttpResponse({
        res,
        status: 200,
        body: {
          message: "Ho gaya",
        },
      });
    }
  );

  // Routes Handler for register route

  router.post(
    "register",
    celebrate({
      body: Joi.object({
        username: Joi.string().min(3).max(30).required(),
        email: Joi.string().email(),
        fullName: Joi.string().required(),
        password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{8,30}$")),
        confirmPassword: Joi.ref("password"),
      }),
    }),
    async (req: Request, res: Response) => {
      const user = req.body;

      try {
        const { data } = await axios.get(
          `https://block-temporary-email.com/check/email/${user.email}`
        );

        if (data.temporary)
          makeHttpResponse({
            res,
            status: 400,
            body: { message: "Invalid Email !!!" },
          });
        else {
          makeHttpResponse({ res, status: 200, body: { message: "Success" } });
        }
      } catch (err) {
        makeHttpResponse({
          res,
          status: 500,
          body: { message: "Internal Server Error !!!" },
        });
      }
    }
  );

  app.use(errors());
};
