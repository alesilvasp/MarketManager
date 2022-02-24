import { Router } from "express";

import {
  productCreateController,
  productReadController,
  productReadByIdController,
  productUpdateController,
} from "../../controllers/product/index";

import {
  userAuthentication,
  userIsAdm,
  userAuthorization,
} from "../../middlewares";

import { validate } from "../../middlewares/globalMiddlewares/validation.middleware";
import { productCreateSchema } from "../../schemas/product/product.create.schema";
import { productUpdateSchema } from "../../schemas/product/product.update.schema";

const router = Router();

export const productRouter = () => {
  router.post(
    "",
    [validate(productCreateSchema)],
    productCreateController
  ); // adicionar os middlewares apos rota de login
  router.get("", productReadController);
  router.get("/:product_id", productReadByIdController);
  router.patch(
    "/:product_id",
    [validate(productUpdateSchema)],
    productUpdateController
  );

  return router;
};
