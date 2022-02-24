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
exports.cashierCreateService = void 0;
const typeorm_1 = require("typeorm");
const appError_1 = __importDefault(require("../../errors/appError"));
const entities_1 = require("../../entities");
const cashierCreateService = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const { balance } = body;
    try {
        const cashierRepository = (0, typeorm_1.getRepository)(entities_1.Cashier);
        const newCashier = cashierRepository.create({
            subtotal: 0,
            balance: balance,
            logs: [],
            order_details: [],
            order_products: [],
        });
        yield cashierRepository.save(newCashier);
        return newCashier;
    }
    catch (error) {
        if (error.code === "23502") {
            throw new appError_1.default(`Field balance cannot be empty`, 400);
        }
    }
});
exports.cashierCreateService = cashierCreateService;
