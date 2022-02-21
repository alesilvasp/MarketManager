"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRouter = void 0;
const express_1 = require("express");
const category_create_schema_1 = require("../../schemas/category.create.schema");
const category_create_controller_1 = require("../../controllers/category/category.create.controller");
const validation_middleware_1 = require("../../middlewares/globalMiddlewares/validation.middleware");
const router = (0, express_1.Router)();
const categoryRouter = () => {
    router.post("", [(0, validation_middleware_1.validate)(category_create_schema_1.categoryCreateSchema)], category_create_controller_1.categoryCreateController);
    return router;
};
exports.categoryRouter = categoryRouter;
