import { Router } from "express";

import { userCreateController } from "../../controllers/user";
import { validateNewUser } from "../../middlewares";
import userCreateSchema from "../../schemas/user.create.schema";

const router = Router();

export const userAdmRouter = () => {
  router.post("", [validateNewUser(userCreateSchema)], userCreateController);

  return router;
};
