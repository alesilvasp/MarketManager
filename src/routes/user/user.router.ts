import { Router } from "express";

import {
  userCreateController,
  userUpdateController,
  userDeleteController,
} from "../../controllers/user";
import { validateNewUser, userAuthentication, userIsAdm, userAuthorization } from "../../middlewares";
import userCreateSchema from "../../schemas/user.create.schema";

const router = Router();

export const usersRouter = () => {
  router.post("", [userAuthentication, userIsAdm, validateNewUser(userCreateSchema)], userCreateController);
  router.patch("/:user_id", [userAuthentication, userAuthorization], userUpdateController);
  router.delete("/:user_id", [userAuthentication, userIsAdm], userDeleteController);

  return router;
};
