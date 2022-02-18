import { Router } from "express";

import { userCreateController } from "../../controllers/user";
import { validateNewUser } from "../../middlewares";
import userCreateSchema from "../../schemas/user.create.schema";

const router = Router();
const createUserControl = new userCreateController();

export const userAdmRouter = () => {
  router.post(
    "",
    [validateNewUser(userCreateSchema)],
    createUserControl.handle
  );

  return router;
};