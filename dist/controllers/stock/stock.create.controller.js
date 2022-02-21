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
Object.defineProperty(exports, "__esModule", { value: true });
exports.stockCreateController = void 0;
const stock_1 = require("../../services/stock");
const stockCreateController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stockProduct = yield (0, stock_1.stockCreateService)(req.body);
        return res.status(201).json(stockProduct);
    }
    catch (error) {
        next(error);
    }
});
exports.stockCreateController = stockCreateController;
