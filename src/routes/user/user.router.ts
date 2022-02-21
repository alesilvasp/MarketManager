import { Router } from "express";

import {
  userCreateController,
  userUpdateController,
  userDeleteController,
} from "../../controllers/user";
import {
  validateNewUser,
  userAuthentication,
  userIsAdm,
  userAuthorization,
} from "../../middlewares";
import { validate } from "../../middlewares/globalMiddlewares/validation.middleware";
import userCreateSchema from "../../schemas/user.create.schema";

const router = Router();

export const usersRouter = () => {
  router.post(
    "",
    [userAuthentication, userIsAdm, validate(userCreateSchema)],
    userCreateController
  );
  router.patch(
    "/:user_id",
    [userAuthentication, userAuthorization],
    userUpdateController
  );
  router.delete(
    "/:user_id",
    [userAuthentication, userIsAdm],
    userDeleteController
  );

  return router;
};
