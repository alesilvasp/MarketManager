"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const appError_1 = __importDefault(require("../../errors/appError"));
const errorHandler = (err, req, res, next) => {
    if (err instanceof appError_1.default) {
        return res.status(err.statusCode).json({
            message: err.message,
        });
    }
    return res.status(500).json({
        status: "error",
        message: err,
    });
};
exports.errorHandler = errorHandler;
