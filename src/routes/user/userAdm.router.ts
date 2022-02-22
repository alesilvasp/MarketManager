import { Router } from "express";
import { 
  userCreateController,
  userAdminLoginController
 } from "../../controllers/user";

import { validate } from "../../middlewares/globalMiddlewares/validation.middleware";
import userCreateSchema from "../../schemas/user.create.schema";
import userAdminLoginSchema from "../../schemas/user/user.adminlogin.schema";

const router = Router();

export const userAdmRouter = () => {
  router.post("", [validate(userCreateSchema)], userCreateController);
  router.post("/login", [validate(userAdminLoginSchema)], userAdminLoginController)

  return router;
};
