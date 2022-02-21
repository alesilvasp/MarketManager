import { Router } from "express";

import { productCreateController, productReadController, productReadByIdController } from "../../controllers/product/index";

import {
  userAuthentication,
  userIsAdm,
  userAuthorization,
} from "../../middlewares";

import { validate } from "../../middlewares/globalMiddlewares/validation.middleware";
import { productCreateSchema } from "../../schemas/product.create.schema";

const router = Router();

export const productRouter = () => {
  router.post("", [validate(productCreateSchema)], productCreateController); // adicionar os middlewares apos rota de login
  router.get("", productReadController)
  router.get("/:product_id", productReadByIdController)

  return router;
};
