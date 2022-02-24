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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saleProductSearchService = void 0;
const typeorm_1 = require("typeorm");
const entities_1 = require("../../entities");
const appError_1 = __importDefault(require("../../errors/appError"));
const saleProductSearchService = (product_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productRepository = (0, typeorm_1.getRepository)(entities_1.Product);
        const saleProductRepository = (0, typeorm_1.getRepository)(entities_1.SaleProduct);
        const product = yield productRepository.findOne(product_id);
        if (!product) {
            throw new appError_1.default("Product not registered.", 404);
        }
        if (!product.sale_product) {
            throw new appError_1.default("Product not for sale.", 400);
        }
        const forSale = yield saleProductRepository.findOne({
            where: {
                id: product.sale_product.id,
            },
        });
        const { sale_product, stock_product } = product, productData = __rest(product, ["sale_product", "stock_product"]);
        const info = Object.assign(Object.assign({}, forSale), { product: productData });
        return info;
    }
    catch (err) {
        throw new appError_1.default(err.message, err.statusCode);
    }
});
exports.saleProductSearchService = saleProductSearchService;
