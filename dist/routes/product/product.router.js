"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = require("express");
const index_1 = require("../../controllers/product/index");
const validation_middleware_1 = require("../../middlewares/globalMiddlewares/validation.middleware");
const product_create_schema_1 = require("../../schemas/product/product.create.schema");
const product_update_schema_1 = require("../../schemas/product/product.update.schema");
const router = (0, express_1.Router)();
const productRouter = () => {
    router.post("", [(0, validation_middleware_1.validate)(product_create_schema_1.productCreateSchema)], index_1.productCreateController); // adicionar os middlewares apos rota de login
    router.get("", index_1.productReadController);
    router.get("/:product_id", index_1.productReadByIdController);
    router.patch("/:product_id", [(0, validation_middleware_1.validate)(product_update_schema_1.productUpdateSchema)], index_1.productUpdateController);
    return router;
};
exports.productRouter = productRouter;
