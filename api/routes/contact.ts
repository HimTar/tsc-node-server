import { Request, Response, Router } from "express";
import { celebrate, Joi, errors } from "celebrate";

import Contacts from "../../mongoDB/queries/contactQueries";

import makeHttpResponse from "../../helpers/makeHttpResponse";

const router = Router();

// Routes Handled in the file
//      /contact/add
//      /contact/get

export default async (app: Router) => {
  // All auth related routes starts with /auth

  app.use("/contact", router);

  // Routes Handler for get contact route

  router.get("/get", async (req: Request, res: Response) => {
    const databaseRes = await Contacts.find();

    if (databaseRes.success) {
      return makeHttpResponse({
        res,
        status: 200,
        body: {
          allContacts: databaseRes.data,
        },
      });
    }

    makeHttpResponse({
      res,
      status: 500,
      body: {
        message: databaseRes.error,
      },
    });
  });

  // Routes Handler for add contact route

  router.post(
    "/add",
    celebrate({
      body: Joi.object({
        email: Joi.string().email(),
        name: Joi.string().required(),
        message: Joi.string(),
      }),
    }),
    async (req: Request, res: Response) => {
      const databaseRes = await Contacts.add(req.body);

      if (databaseRes.success) {
        return makeHttpResponse({
          res,
          status: 200,
          body: {
            message: "Contact saved successfully",
          },
        });
      }

      makeHttpResponse({
        res,
        status: 500,
        body: {
          message: databaseRes.error,
        },
      });
    }
  );

  app.use(errors());
};
