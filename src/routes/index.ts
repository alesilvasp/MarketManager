import { Express } from "express";

import { usersRouter } from "./user/user.router";
import { userAdmRouter } from "./user/userAdm.router";
import { stockRouter } from "./stock/stock.router";

import { userAuthentication, userIsAdm } from "../middlewares";

export const initializerRouter = (app: Express) => {
  app.use("/user", usersRouter());
  app.use("/admin", userAdmRouter());

  app.use("/stock", [userAuthentication, userIsAdm], stockRouter());
};
