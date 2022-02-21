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
exports.stockCreateService = void 0;
const entities_1 = require("../../entities");
const typeorm_1 = require("typeorm");
const appError_1 = __importDefault(require("../../errors/appError"));
const stockCreateService = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const { product_id, stock, batch, expires_in } = body;
    const stockRepository = (0, typeorm_1.getRepository)(entities_1.StockProduct);
    const productRepository = (0, typeorm_1.getRepository)(entities_1.Product);
    const product = yield productRepository.findOne({ id: product_id });
    if (!product) {
        throw new appError_1.default("Product not found.", 400);
    }
    const stockProduct = stockRepository.create({
        stock,
        batch,
        expires_in: expires_in.split("/").reverse(),
        product: product,
    });
    yield stockRepository.save(stockProduct);
    return stockProduct;
});
exports.stockCreateService = stockCreateService;
