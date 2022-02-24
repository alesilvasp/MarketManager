"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAdmRouter = void 0;
const express_1 = require("express");
const user_1 = require("../../controllers/user");
const validation_middleware_1 = require("../../middlewares/globalMiddlewares/validation.middleware");
const user_create_schema_1 = __importDefault(require("../../schemas/user/user.create.schema"));
const user_adminlogin_schema_1 = __importDefault(require("../../schemas/user/user.adminlogin.schema"));
const router = (0, express_1.Router)();
const userAdmRouter = () => {
    router.post("", [(0, validation_middleware_1.validate)(user_create_schema_1.default)], user_1.userCreateController);
    router.post("/login", [(0, validation_middleware_1.validate)(user_adminlogin_schema_1.default)], user_1.userAdminLoginController);
    return router;
};
exports.userAdmRouter = userAdmRouter;
