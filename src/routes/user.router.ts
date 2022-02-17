import { Router } from "express";

import { userCreateController, userUpdateController } from "../controllers";
import { validateNewUser } from "../middlewares";
import userCreateSchema from "../schemas/user.create.schema";

const router = Router();
const createUserControl = new userCreateController();
const updateUserControl = new userUpdateController();

export const usersRouter = () => {
  router.post(
    "",
    [validateNewUser(userCreateSchema)],
    createUserControl.handle
  );
  router.patch("/:user_id", updateUserControl.handle);

  return router;
};
