"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stockRouter = void 0;
const express_1 = require("express");
const stock_1 = require("../../controllers/stock");
const stock_create_schema_1 = require("../../schemas/stock.create.schema");
const validation_middleware_1 = require("../../middlewares/globalMiddlewares/validation.middleware");
const middlewares_1 = require("../../middlewares");
const router = (0, express_1.Router)();
const stockRouter = () => {
    router.post("", [middlewares_1.userAuthentication, middlewares_1.userIsAdm, (0, validation_middleware_1.validate)(stock_create_schema_1.stockCreateSchema)], stock_1.stockCreateController);
    return router;
};
exports.stockRouter = stockRouter;
