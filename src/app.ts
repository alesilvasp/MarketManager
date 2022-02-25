import "reflect-metadata";
import express from "express";

import { errorHandler } from "./middlewares/globalMiddlewares/error.middleware";
import { initializerRouter } from "./routes";

import swaggerUi from "swagger-ui-express";
import swaggerFile from '../swagger.json'

const app = express();

app.use(express.json());

app.use("/api-documentation", swaggerUi.serve, swaggerUi.setup(swaggerFile));

initializerRouter(app);

app.use(errorHandler);

export default app;
