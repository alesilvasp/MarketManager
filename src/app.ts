import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import { ErrorHandler, handleError } from "./errors/errorHandler";
import { errorHandler } from "./middlewares/globalMiddlewares/error.middleware";
import { initializerRouter } from "./routes";

const app = express();

app.use(express.json());

initializerRouter(app);

app.use(errorHandler);

export default app;
