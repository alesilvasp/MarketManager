import { Express } from "express";

import { usersRouter } from "./user/user.router";
import { userAdmRouter } from "./user/userAdm.router";

export const initializerRouter = (app: Express) => {
  app.use("/user", usersRouter());
  app.use("/admin", userAdmRouter());

};