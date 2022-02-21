"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAuthorization = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_config_1 = require("../../config/jwt.config");
const appError_1 = __importDefault(require("../../errors/appError"));
const userAuthorization = (req, res, next) => {
    try {
        jsonwebtoken_1.default.verify(req.token, jwt_config_1.config.secret, (err, decoded) => {
            if (err) {
                throw new appError_1.default("Invalid token.", 401);
            }
            const { user_id } = req.params;
            if (!decoded.isAdm && decoded.id !== user_id) {
                throw new appError_1.default("Unauthorized, user is neither an Admin nor the Owner.", 403);
            }
            return next();
        });
    }
    catch (err) {
        return next(err);
    }
};
exports.userAuthorization = userAuthorization;
