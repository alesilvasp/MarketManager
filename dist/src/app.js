"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const error_middleware_1 = require("./middlewares/globalMiddlewares/error.middleware");
const routes_1 = require("./routes");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("../swagger.json"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api-documentation", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
(0, routes_1.initializerRouter)(app);
app.use(error_middleware_1.errorHandler);
exports.default = app;
