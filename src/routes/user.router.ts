import { Router } from "express";

import { userCreateController } from "../controllers";
import { validateNewUser } from "../middlewares";
import userCreateSchema from "../schemas/user.create.schema";

const router = Router();
const createUserControl = new userCreateController();

export const usersRouter = () => {
  router.post(
    "",
    [validateNewUser(userCreateSchema)],
    createUserControl.handle
  );

  return router;
};
