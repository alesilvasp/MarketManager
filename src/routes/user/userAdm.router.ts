import { Router } from "express";
import { userCreateController } from "../../controllers/user";
import { validate } from "../../middlewares/globalMiddlewares/validation.middleware";
import userCreateSchema from "../../schemas/user/user.create.schema";

const router = Router();

export const userAdmRouter = () => {
  router.post("", [validate(userCreateSchema)], userCreateController);

  return router;
};
