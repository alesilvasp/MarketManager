import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import { ErrorHandler, handleError } from "./errors/errorHandler";
import { initializerRouter } from "./routes";

const app = express();

app.use(express.json());

initializerRouter(app);

app.use(
  (err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
    handleError(err, res);
  }
);

export default app;
