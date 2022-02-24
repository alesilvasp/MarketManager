import { Router } from "express";
import { categoryCreateSchema } from "../../schemas/category.create.schema";
import {
  categoryCreateController,
  categoryReadController,
  categoryUpdateController,
} from "../../controllers/category";
import { validate } from "../../middlewares/globalMiddlewares/validation.middleware";
import { userAuthentication, userIsAdm } from "../../middlewares";
const router = Router();

export const categoryRouter = () => {
  router.post(
    "",
    [userAuthentication, userIsAdm, validate(categoryCreateSchema)],
    categoryCreateController
  );
  router.get("", [userAuthentication, userIsAdm], categoryReadController);
  router.patch(
    "/:category_id",
    [userAuthentication, userIsAdm],
    categoryUpdateController
  );

  return router;
};
