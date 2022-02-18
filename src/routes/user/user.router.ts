import { Router } from "express";

import {
  userCreateController,
  userUpdateController,
  userDeleteController,
} from "../../controllers/user";
import { validateNewUser } from "../../middlewares";
import userCreateSchema from "../../schemas/user.create.schema";

const router = Router();
const createUserControl = new userCreateController();
const updateUserControl = new userUpdateController();
const deleteUserControl = new userDeleteController();

export const usersRouter = () => {
  router.post(
    "",
    [validateNewUser(userCreateSchema)],
    createUserControl.handle
  );
  router.patch("/:user_id", updateUserControl.handle);
  router.delete("/:user_id", deleteUserControl.handle);

  return router;
};

// separar router admin
