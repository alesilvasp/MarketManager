import { Router } from "express";
import {
  stockCreateController,
  stockUpdateController,
} from "../../controllers/stock";
import { stockCreateSchema } from "../../schemas/stock.create.schema";
import { stockUpdateSchema } from "../../schemas/stock.update.schema";
import { validate } from "../../middlewares/globalMiddlewares/validation.middleware";
import { userAuthentication, userIsAdm } from "../../middlewares";
import {
  saleProductController,
  saleProductSearchController,
} from "../../controllers/sale_products";
import { saleProductTransferSchema } from "../../schemas/sale_product.schema";

const router = Router();

export const stockRouter = () => {
  router.post(
    "/receivement",
    [userAuthentication, userIsAdm, validate(stockCreateSchema)],
    stockCreateController
  );
  router.patch(
    "/receivement/:stock_id",
    [userAuthentication, userIsAdm, validate(stockUpdateSchema)],
    stockUpdateController
  );
  router.post(
    "/for_sale",
    [userAuthentication, validate(saleProductTransferSchema)],
    saleProductController
  );
  router.get(
    "/for_sale/:product_id",
    [userAuthentication],
    saleProductSearchController
  );

  return router;
};
