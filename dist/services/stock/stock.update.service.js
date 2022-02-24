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
exports.stockUpdateService = void 0;
const entities_1 = require("../../entities");
const typeorm_1 = require("typeorm");
const appError_1 = __importDefault(require("../../errors/appError"));
const stockUpdateService = (stock_id, body) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { batch, expires_in, stock } = body;
        const stockRepository = (0, typeorm_1.getRepository)(entities_1.StockProduct);
        const stockProduct = yield stockRepository.findOne(stock_id);
        if (!stockProduct) {
            throw new appError_1.default("Product not found in stock.", 404);
        }
        const target = stockProduct.stock + (stock || 0);
        yield stockRepository.save(Object.assign(Object.assign({}, stockProduct), { batch, stock: target, expires_in: expires_in === null || expires_in === void 0 ? void 0 : expires_in.split("/").reverse() }));
        return yield stockRepository.findOne(stock_id);
    }
    catch (err) {
        throw new appError_1.default(err.message, err.statusCode);
    }
});
exports.stockUpdateService = stockUpdateService;
