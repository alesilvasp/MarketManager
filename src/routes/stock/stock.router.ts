import { Router } from "express";
import { stockCreateController } from "../../controllers/stock";
import { stockUpdateController } from "../../controllers/stock/stock.update.controller";
import { validateNewStockProduct } from "../../middlewares/stock/stock.create.validate";
import { validateUpdateStockProduct } from "../../middlewares/stock/stock.update.validate";
import { stockCreateSchema } from "../../schemas/stock.create.schema";
import { stockUpdateSchema } from "../../schemas/stock.update.schema";

const router = Router();

export const stockRouter = () => {
  router.post(
    "",
    [validateNewStockProduct(stockCreateSchema)],
    stockCreateController
  );
  router.patch(
    "/:stock_id",
    [validateUpdateStockProduct(stockUpdateSchema)],
    stockUpdateController
  );

  return router;
};
