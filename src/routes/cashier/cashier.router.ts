import { Router } from "express";
import { ReturnedProductRepository } from "../../../dist/repositories/returned_product.repository";

import {
  cashierCreateController,
  cashierReadByIdController,
  cashierReadController,
} from "../../controllers/cashier";
import { orderProductCreateController } from "../../controllers/orderProduct";

import {
  userAuthentication,
  userIsAdm,
  userAuthorization,
} from "../../middlewares";

const router = Router();

export const cashierRouter = () => {
  router.post("", cashierCreateController);
  router.post("/:cashier_id/product", orderProductCreateController);
  router.get("", cashierReadController);
  router.get("/:cashier_id", cashierReadByIdController);

  return router;
};
