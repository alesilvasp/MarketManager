import { Router } from "express";
import { categoryCreateSchema } from "../../schemas/category.create.schema";
import { categoryCreateController } from "../../controllers/category/category.create.controller";
import { validate } from "../../middlewares/globalMiddlewares/validation.middleware";
import { userAuthentication, userIsAdm } from "../../middlewares";
const router = Router();

export const categoryRouter = () => {
  router.post("", [validate(categoryCreateSchema)], categoryCreateController);

  return router;
};
