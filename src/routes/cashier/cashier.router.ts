import { Router } from "express";

import {
  cashierCreateController,
  cashierReadByIdController,
  cashierReadController,
  cashierLoginController,
  cashierLogoutController,
} from "../../controllers/cashier";
import {
  orderProductCreateController,
  orderProductDeleteController,
} from "../../controllers/orderProduct";
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
import { validate } from "../../middlewares/globalMiddlewares/validation.middleware";
import cashierLoginSchema from "../../schemas/cashier/user.login.schema";
import { orderProductDeleteSchema } from "../../schemas/order_product/orderProduct.delete.schema";

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
  router.post(
    "/:cashier_id/login",
    [validate(cashierLoginSchema)],
    cashierLoginController
  );
  router.post(
    "/:cashier_id/logout",
    userAuthentication,
    cashierLogoutController
  );
  router.delete(
    "/:cashier_id/product/:product_id",
    userAuthentication,
    userAuthorization,
    validate(orderProductDeleteSchema),
    orderProductDeleteController
  );

  return router;
};
