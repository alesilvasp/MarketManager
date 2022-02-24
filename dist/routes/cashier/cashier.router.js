"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cashierRouter = void 0;
const express_1 = require("express");
const cashier_1 = require("../../controllers/cashier");
const orderProduct_1 = require("../../controllers/orderProduct");
const orderDetails_1 = require("../../controllers/orderDetails");
const middlewares_1 = require("../../middlewares");
const router = (0, express_1.Router)();
const cashierRouter = () => {
    router.post("", middlewares_1.userAuthentication, middlewares_1.userIsAdm, cashier_1.cashierCreateController);
    router.post("/:cashier_id/product", middlewares_1.userAuthentication, middlewares_1.userAuthorization, orderProduct_1.orderProductCreateController);
    router.get("", middlewares_1.userAuthentication, middlewares_1.userAuthorization, cashier_1.cashierReadController);
    router.get("/:cashier_id", middlewares_1.userAuthentication, middlewares_1.userAuthorization, cashier_1.cashierReadByIdController);
    router.post("/:cashier_id/order", middlewares_1.userAuthentication, middlewares_1.userAuthorization, orderDetails_1.orderDetailsCreateController);
    router.get("/:cashier_id/order", middlewares_1.userAuthentication, middlewares_1.userAuthorization, orderDetails_1.orderDetailsReadController);
    router.get("/:cashier_id/order/:order_id", middlewares_1.userAuthentication, middlewares_1.userAuthorization, orderDetails_1.orderDetailsreadByIdController);
    return router;
};
exports.cashierRouter = cashierRouter;
