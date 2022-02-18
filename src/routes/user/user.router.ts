import { Router } from "express";

import {
  userCreateController,
  userUpdateController,
  userDeleteController,
} from "../../controllers/user";
import { validateNewUser } from "../../middlewares";
import userCreateSchema from "../../schemas/user.create.schema";

const router = Router();

export const usersRouter = () => {
  router.post("", [validateNewUser(userCreateSchema)], userCreateController);
  router.patch("/:user_id", userUpdateController);
  router.delete("/:user_id", userDeleteController);

  return router;
};
