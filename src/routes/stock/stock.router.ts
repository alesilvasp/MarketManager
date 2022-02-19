import { Router } from "express";
import { stockCreateController } from "../../controllers/stock";
import { validateNewStockProduct } from "../../middlewares/stock/stock.create.validate";
import { stockCreateSchema } from "../../schemas/stock.create.schema";

const router = Router();

export const stockRouter = () => {
  router.post(
    "",
    [validateNewStockProduct(stockCreateSchema)],
    stockCreateController
  );

  return router;
};
