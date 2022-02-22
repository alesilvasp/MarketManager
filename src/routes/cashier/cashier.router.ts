import { Router } from "express";

import { cashierCreateController } from "../../controllers/cashier";
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

  return router;
};
