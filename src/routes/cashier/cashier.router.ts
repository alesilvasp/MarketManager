import { Router } from "express";

import { cashierCreateController } from "../../controllers/cashier";

import {
  userAuthentication,
  userIsAdm,
  userAuthorization,
} from "../../middlewares";

const router = Router();

export const cashierRouter = () => {
  router.post("", cashierCreateController);

  return router;
};
