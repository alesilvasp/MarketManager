"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cashierRouter = void 0;
const express_1 = require("express");
const cashier_1 = require("../../controllers/cashier");
const orderProduct_1 = require("../../controllers/orderProduct");
const orderDetails_1 = require("../../controllers/orderDetails");
const middlewares_1 = require("../../middlewares");
const validation_middleware_1 = require("../../middlewares/globalMiddlewares/validation.middleware");
const user_login_schema_1 = __importDefault(require("../../schemas/cashier/user.login.schema"));
const orderProduct_delete_schema_1 = require("../../schemas/order_product/orderProduct.delete.schema");
const router = (0, express_1.Router)();
const cashierRouter = () => {
    router.post("", middlewares_1.userAuthentication, middlewares_1.userIsAdm, cashier_1.cashierCreateController);
    router.post("/:cashier_id/product", middlewares_1.userAuthentication, middlewares_1.userAuthorization, orderProduct_1.orderProductCreateController);
    router.get("", middlewares_1.userAuthentication, middlewares_1.userAuthorization, cashier_1.cashierReadController);
    router.get("/:cashier_id", middlewares_1.userAuthentication, middlewares_1.userAuthorization, cashier_1.cashierReadByIdController);
    router.post("/:cashier_id/order", middlewares_1.userAuthentication, middlewares_1.userAuthorization, orderDetails_1.orderDetailsCreateController);
    router.get("/:cashier_id/order", middlewares_1.userAuthentication, middlewares_1.userAuthorization, orderDetails_1.orderDetailsReadController);
    router.get("/:cashier_id/order/:order_id", middlewares_1.userAuthentication, middlewares_1.userAuthorization, orderDetails_1.orderDetailsreadByIdController);
    router.post("/:cashier_id/login", [(0, validation_middleware_1.validate)(user_login_schema_1.default)], cashier_1.cashierLoginController);
    router.post("/:cashier_id/logout", middlewares_1.userAuthentication, cashier_1.cashierLogoutController);
    router.delete("/:cashier_id/product/:product_id", middlewares_1.userAuthentication, middlewares_1.userIsAdm, (0, validation_middleware_1.validate)(orderProduct_delete_schema_1.orderProductDeleteSchema), orderProduct_1.orderProductDeleteController);
    return router;
};
exports.cashierRouter = cashierRouter;
