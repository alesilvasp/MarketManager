import { Express } from "express";

import { usersRouter } from "./user.router";

export const initializerRouter = (app: Express) => {
  app.use("/user", usersRouter());
  app.use("/admin", usersRouter());
};