import { Router } from "express";
import { stockCreateController } from "../../controllers/stock";
import { stockCreateSchema } from "../../schemas/stock.create.schema";
import { validate } from "../../middlewares/globalMiddlewares/validation.middleware";
import { userAuthentication, userIsAdm } from "../../middlewares";
const router = Router();

export const stockRouter = () => {
  router.post(
    "",
    [userAuthentication, userIsAdm, validate(stockCreateSchema)],
    stockCreateController
  );

  return router;
};
