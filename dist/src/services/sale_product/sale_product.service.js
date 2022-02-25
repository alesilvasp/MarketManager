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
exports.saleProductService = void 0;
const typeorm_1 = require("typeorm");
const entities_1 = require("../../entities");
const appError_1 = __importDefault(require("../../errors/appError"));
const saleProductService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const saleProductRepository = (0, typeorm_1.getRepository)(entities_1.SaleProduct);
        const stockRepository = (0, typeorm_1.getRepository)(entities_1.StockProduct);
        const productRepository = (0, typeorm_1.getRepository)(entities_1.Product);
        let { name, quantity } = data;
        const product = yield productRepository.findOne({
            where: { name: name.toLowerCase() },
        });
        if (!product) {
            throw new appError_1.default("Product not found.", 404);
        }
        const sortedProducts = product.stock_product
            .filter((prod) => prod.stock > 0)
            .sort((a, b) => (a.expires_in > b.expires_in ? 1 : -1));
        let info = [];
        let endPoint = sortedProducts.length;
        for (let i = 0; quantity != 0 && i < endPoint; i++) {
            let prod = sortedProducts[i];
            let qnt = prod.stock - quantity;
            if (qnt < 0) {
                yield stockRepository.save(Object.assign(Object.assign({}, prod), { stock: 0 }));
                if (product.sale_product) {
                    const forSale = yield saleProductRepository.findOne({
                        where: { id: product.sale_product.id },
                    });
                    yield saleProductRepository.save(Object.assign(Object.assign({}, forSale), { stock: forSale.stock + quantity }));
                }
                else {
                    const newSaleProduct = saleProductRepository.create({
                        product: product,
                        stock: prod.stock,
                    });
                    yield saleProductRepository.save(newSaleProduct);
                }
                info.push({ qnt: prod.stock, batch: prod.batch });
                quantity = -qnt;
            }
            else if (qnt >= 0) {
                yield stockRepository.save(Object.assign(Object.assign({}, prod), { stock: prod.stock - quantity }));
                if (product.sale_product) {
                    const forSale = yield saleProductRepository.findOne({
                        where: { id: product.sale_product.id },
                    });
                    yield saleProductRepository.save(Object.assign(Object.assign({}, forSale), { stock: forSale.stock + quantity }));
                }
                else {
                    const newSaleProduct = saleProductRepository.create({
                        product: product,
                        stock: quantity,
                    });
                    yield saleProductRepository.save(newSaleProduct);
                }
                info.push({ qnt: quantity, batch: prod.batch });
                quantity = 0;
            }
        }
        const filtered = info.filter((n) => n.qnt > 0);
        if (filtered.length === 0) {
            throw new appError_1.default("Product not in stock.", 404);
        }
        return filtered;
    }
    catch (err) {
        throw new appError_1.default(err.message, err.statusCode);
    }
});
exports.saleProductService = saleProductService;
