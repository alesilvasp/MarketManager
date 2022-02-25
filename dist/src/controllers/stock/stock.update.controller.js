"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stockUpdateController = void 0;
const stock_1 = require("../../services/stock");
const appError_1 = __importDefault(require("../../errors/appError"));
const stockUpdateController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { stock_id } = req.params;
        const { body } = req;
        if (body.stock && typeof body.stock !== "number") {
            throw new appError_1.default("Quantity must be a number.", 400);
        }
        const stockUpdated = yield (0, stock_1.stockUpdateService)(stock_id, body);
        return res.status(200).json({ updated: stockUpdated });
    }
    catch (err) {
        next(err);
    }
});
exports.stockUpdateController = stockUpdateController;
