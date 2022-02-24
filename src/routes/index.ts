import { Express } from "express";
import { usersRouter } from "./user/user.router";
import { userAdmRouter } from "./user/userAdm.router";
import { stockRouter } from "./stock/stock.router";
import { categoryRouter } from "./category/category.router";
import { productRouter } from "./product/product.router";
import { cashierRouter } from "./cashier/cashier.router";

export const initializerRouter = (app: Express) => {
  app.use("/user", usersRouter());
  app.use("/admin", userAdmRouter());
  app.use("/category", categoryRouter());
  app.use("/stock", stockRouter());
  app.use('/product', productRouter())
  app.use('/cashier', cashierRouter())
};
