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
exports.orderDetailsCreateService = void 0;
const typeorm_1 = require("typeorm");
const appError_1 = __importDefault(require("../../errors/appError"));
const entities_1 = require("../../entities");
const orderDetailsCreateService = (cashier_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderDetailsRepository = (0, typeorm_1.getRepository)(entities_1.OrderDetails);
        const cashierRepository = (0, typeorm_1.getRepository)(entities_1.Cashier);
        const cashier = yield cashierRepository.findOneOrFail(cashier_id, {
            relations: ["order_products"],
        });
        if (cashier.order_products.length <= 0) {
            throw new appError_1.default(`The cashier is empty`, 400);
        }
        console.log("------------------", cashier);
        const newOrderDetails = orderDetailsRepository.create({
            total: cashier.subtotal,
            cashier: cashier,
            order_products: cashier.order_products,
        });
        yield orderDetailsRepository.save(newOrderDetails);
        cashier.order_products = [];
        cashier.balance = cashier.balance + cashier.subtotal;
        cashier.subtotal = 0;
        yield cashierRepository.save(cashier);
        const orderDetailsProducts = [];
        const products = newOrderDetails.order_products.map((order) => {
            orderDetailsProducts.push({
                product_name: order.product.name,
                price: order.product.price,
                quantity: order.quantity,
            });
        });
        const response = {
            "invoice number": newOrderDetails.id,
            total: newOrderDetails.total,
            "issue date": newOrderDetails.created_at,
            products: orderDetailsProducts,
        };
        return response;
    }
    catch (error) {
        if (error.message.includes("Cashier")) {
            throw new appError_1.default(`Cashier id ${cashier_id} do not exists`, 404);
        }
        throw new appError_1.default(error.message, error.statusCode);
    }
});
exports.orderDetailsCreateService = orderDetailsCreateService;
