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
exports.cashierCreateController = void 0;
const appError_1 = __importDefault(require("../../errors/appError"));
const cashier_1 = require("../../services/cashier");
const cashierCreateController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        if (typeof body.balance !== "number") {
            throw new appError_1.default("balance must be a number", 400);
        }
        const cashierCreate = yield (0, cashier_1.cashierCreateService)(body);
        return res.status(201).json(cashierCreate);
    }
    catch (error) {
        next(error);
    }
});
exports.cashierCreateController = cashierCreateController;
