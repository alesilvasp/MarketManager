"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializerRouter = void 0;
const user_router_1 = require("./user/user.router");
const userAdm_router_1 = require("./user/userAdm.router");
const stock_router_1 = require("./stock/stock.router");
const category_router_1 = require("./category/category.router");
const initializerRouter = (app) => {
    app.use("/user", (0, user_router_1.usersRouter)());
    app.use("/admin", (0, userAdm_router_1.userAdmRouter)());
    app.use("/category", (0, category_router_1.categoryRouter)());
    app.use("/stock", (0, stock_router_1.stockRouter)());
};
exports.initializerRouter = initializerRouter;
