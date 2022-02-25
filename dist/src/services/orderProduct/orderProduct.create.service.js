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
exports.orderProductCreateService = void 0;
const typeorm_1 = require("typeorm");
const appError_1 = __importDefault(require("../../errors/appError"));
const entities_1 = require("../../entities");
const orderProductCreateService = (body, cashier_id) => __awaiter(void 0, void 0, void 0, function* () {
    const { product_id, quantity } = body;
    try {
        const cashierRepository = (0, typeorm_1.getRepository)(entities_1.Cashier);
        const productRepository = (0, typeorm_1.getRepository)(entities_1.Product);
        const orderProductRepository = (0, typeorm_1.getRepository)(entities_1.OrderProduct);
        const saleProductRepository = (0, typeorm_1.getRepository)(entities_1.SaleProduct);
        const cashier = yield cashierRepository.findOneOrFail(cashier_id);
        const product = yield productRepository.findOneOrFail(product_id);
        const sale_product = yield saleProductRepository.findOneOrFail(product.sale_product);
        const newOrderProduct = orderProductRepository.create({
            product: product,
            quantity: quantity,
            cashier: cashier,
            subtotal: Number((product.price * quantity).toFixed(2)),
        });
        sale_product.stock -= quantity;
        cashier.subtotal += newOrderProduct.subtotal;
        if (sale_product.stock < 0) {
            throw new appError_1.default("Quantity beyond items for sale.", 400);
        }
        yield saleProductRepository.save(sale_product);
        yield cashierRepository.save(cashier);
        yield orderProductRepository.save(newOrderProduct);
        const orderProductDetails = yield orderProductRepository.findOneOrFail({
            id: newOrderProduct.id,
        }, { relations: ["cashier"] });
        const _a = orderProductDetails.product, { stock_product } = _a, restInfo = __rest(_a, ["stock_product"]);
        return Object.assign(Object.assign({}, orderProductDetails), { product: restInfo });
    }
    catch (error) {
        if (error.message.includes("Cashier")) {
            throw new appError_1.default(`Cashier id ${cashier_id} do not exists`, 404);
        }
        if (error.message.includes("Product")) {
            throw new appError_1.default(`Product id ${product_id} is not for sale`, 404);
        }
    }
});
exports.orderProductCreateService = orderProductCreateService;
