"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = require("express");
const user_1 = require("../../controllers/user");
const middlewares_1 = require("../../middlewares");
const validation_middleware_1 = require("../../middlewares/globalMiddlewares/validation.middleware");
const user_create_schema_1 = __importDefault(require("../../schemas/user/user.create.schema"));
const user_recover_schema_1 = __importDefault(require("../../schemas/user/user.recover.schema"));
const user_changepassword_schema_1 = __importDefault(require("../../schemas/user/user.changepassword.schema"));
const router = (0, express_1.Router)();
const usersRouter = () => {
    router.post("", [middlewares_1.userAuthentication, middlewares_1.userIsAdm, (0, validation_middleware_1.validate)(user_create_schema_1.default)], user_1.userCreateController);
    router.patch("/:user_id", [middlewares_1.userAuthentication, middlewares_1.userAuthorization], user_1.userUpdateController);
    router.delete("/:user_id", [middlewares_1.userAuthentication, middlewares_1.userIsAdm], user_1.userDeleteController);
    router.get("", [middlewares_1.userAuthentication, middlewares_1.userIsAdm], user_1.userListController);
    router.post("/recover", [(0, validation_middleware_1.validate)(user_recover_schema_1.default)], user_1.userRecoverController);
    router.post("/changepassword", [(0, validation_middleware_1.validate)(user_changepassword_schema_1.default)], user_1.userChangePasswordController);
    return router;
};
exports.usersRouter = usersRouter;
