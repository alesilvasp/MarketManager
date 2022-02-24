import { Router } from "express";
import { ReturnedProductRepository } from "../../../dist/repositories/returned_product.repository";

import {
  cashierCreateController,
  cashierReadByIdController,
  cashierReadController,
} from "../../controllers/cashier";
import { orderProductCreateController } from "../../controllers/orderProduct";
import {
  orderDetailsCreateController,
  orderDetailsreadByIdController,
  orderDetailsReadController,
} from "../../controllers/orderDetails";
import {
  userAuthentication,
  userIsAdm,
  userAuthorization,
} from "../../middlewares";

const router = Router();

export const cashierRouter = () => {
  router.post("", userAuthentication, userIsAdm, cashierCreateController);
  router.post(
    "/:cashier_id/product",
    userAuthentication,
    userAuthorization,
    orderProductCreateController
  );
  router.get("", userAuthentication, userAuthorization, cashierReadController);
  router.get(
    "/:cashier_id",
    userAuthentication,
    userAuthorization,
    cashierReadByIdController
  );
  router.post(
    "/:cashier_id/order",
    userAuthentication,
    userAuthorization,
    orderDetailsCreateController
  );
  router.get(
    "/:cashier_id/order",
    userAuthentication,
    userAuthorization,
    orderDetailsReadController
  );
  router.get(
    "/:cashier_id/order/:order_id",
    userAuthentication,
    userAuthorization,
    orderDetailsreadByIdController
  );

  return router;
};
