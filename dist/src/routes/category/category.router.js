"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRouter = void 0;
const express_1 = require("express");
const category_create_schema_1 = require("../../schemas/category.create.schema");
const category_1 = require("../../controllers/category");
const validation_middleware_1 = require("../../middlewares/globalMiddlewares/validation.middleware");
const middlewares_1 = require("../../middlewares");
const router = (0, express_1.Router)();
const categoryRouter = () => {
    router.post("", [middlewares_1.userAuthentication, middlewares_1.userIsAdm, (0, validation_middleware_1.validate)(category_create_schema_1.categoryCreateSchema)], category_1.categoryCreateController);
    router.get("", [middlewares_1.userAuthentication, middlewares_1.userIsAdm], category_1.categoryReadController);
    router.patch("/:category_id", [middlewares_1.userAuthentication, middlewares_1.userIsAdm], category_1.categoryUpdateController);
    return router;
};
exports.categoryRouter = categoryRouter;
