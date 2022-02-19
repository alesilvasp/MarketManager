import { Router } from "express";

import {
  userCreateController,
  userUpdateController,
  userDeleteController,
  userRecoverController,
  userListController,
  userChangePasswordController
} from "../../controllers/user";

import { 
  validateNewUser,
  validateChangePassword,
  validateRecover, 
  userAuthentication, 
  userIsAdm, 
  userAuthorization,
} from "../../middlewares";


import userCreateSchema from "../../schemas/user.create.schema";
import userRecoverSchema from "../../schemas/user/user.recover.schema"
import userChangePasswordSchema from "../../schemas/user/user.changepassword.schema"


const router = Router();

export const usersRouter = () => {
  router.post("", [userAuthentication, userIsAdm, validateNewUser(userCreateSchema)], userCreateController);
  router.patch("/:user_id", [userAuthentication, userAuthorization], userUpdateController);
  router.delete("/:user_id", [userAuthentication, userIsAdm], userDeleteController);
  router.get("", [userAuthentication, userIsAdm], userListController)
  router.post("/recover", [validateRecover(userRecoverSchema)], userRecoverController)
  router.post("/changepassword", [validateChangePassword(userChangePasswordSchema)], userChangePasswordController)


  return router;
};
