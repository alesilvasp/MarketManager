"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAuthentication = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_config_1 = require("../../config/jwt.config");
const appError_1 = __importDefault(require("../../errors/appError"));
const userAuthentication = (req, res, next) => {
    var _a;
    try {
        const headerAuth = req.headers.authorization;
        if (!headerAuth) {
            throw new appError_1.default("Missing authorization headers", 401);
        }
        const token = ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1]) || "";
        jsonwebtoken_1.default.verify(token, jwt_config_1.config.secret, (err, decoded) => {
            if (err) {
                throw new appError_1.default("Invalid token", 401);
            }
            const userid = decoded.id;
            req.user = { uuid: userid };
        });
        req.token = token;
        return next();
    }
    catch (err) {
        return next(err);
    }
};
exports.userAuthentication = userAuthentication;
