import { Router } from "express";
import {
  stockCreateController,
  stockUpdateController,
} from "../../controllers/stock";
import { stockCreateSchema } from "../../schemas/stock.create.schema";
import { stockUpdateSchema } from "../../schemas/stock.update.schema";
import { validate } from "../../middlewares/globalMiddlewares/validation.middleware";
import { userAuthentication, userIsAdm } from "../../middlewares";

const router = Router();

export const stockRouter = () => {
  router.post(
    "",
    [userAuthentication, userIsAdm, validate(stockCreateSchema)],
    stockCreateController
  );
  router.patch(
    "/:stock_id",
    [userAuthentication, userIsAdm, validate(stockUpdateSchema)],
    stockUpdateController
  );

  return router;
};
