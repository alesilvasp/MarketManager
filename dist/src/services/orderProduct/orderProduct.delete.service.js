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
exports.orderProductDeleteService = void 0;
const typeorm_1 = require("typeorm");
const appError_1 = __importDefault(require("../../errors/appError"));
const entities_1 = require("../../entities");
const orderProductDeleteService = (product_id, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cashier, quantity, discard } = data;
        const orderProductRepository = (0, typeorm_1.getRepository)(entities_1.OrderProduct);
        const cashierRepository = (0, typeorm_1.getRepository)(entities_1.Cashier);
        const productRepository = (0, typeorm_1.getRepository)(entities_1.Product);
        const product = yield productRepository.findOne(product_id);
        if (!product) {
            throw new appError_1.default("Product not found", 404);
        }
        const orderProduct = yield orderProductRepository.find({
            product: { id: product_id },
            cashier: { id: cashier },
        });
        const inCashier = yield cashierRepository.findOneOrFail(cashier);
        let totalItems = 0;
        orderProduct.map((obj) => (totalItems += obj.quantity));
        if (totalItems < quantity) {
            throw new appError_1.default("Quantity to remove beyond allowed", 400);
        }
        let unitPrice = Number((orderProduct[0].subtotal / orderProduct[0].quantity).toFixed(2));
        let totalPrice = Number((unitPrice * quantity).toFixed(2));
        inCashier.subtotal -= totalPrice;
        yield cashierRepository.save(inCashier);
        if (discard) {
            const returnedProductRepository = (0, typeorm_1.getRepository)(entities_1.ReturnedProduct);
            const toReturn = returnedProductRepository.create({
                created_at: new Date(),
                product: product,
                quantity: quantity,
                subtotal: totalPrice,
            });
            yield returnedProductRepository.save(toReturn);
        }
        else {
            const saleProductRepository = (0, typeorm_1.getRepository)(entities_1.SaleProduct);
            const forSale = yield saleProductRepository.findOneOrFail({
                where: { id: product.sale_product.id },
            });
            yield saleProductRepository.save(Object.assign(Object.assign({}, forSale), { stock: forSale.stock + quantity }));
        }
        let endPoint = orderProduct.length;
        let ref = quantity;
        let toDelete = [];
        for (let i = 0; i < endPoint; i++) {
            let prod = orderProduct[i];
            let qnt = prod.quantity - ref;
            if (qnt < 0) {
                toDelete.push(i);
                ref -= prod.quantity;
            }
            else {
                const patchOrder = yield orderProductRepository.findOneOrFail(prod.id);
                patchOrder.quantity -= ref;
                patchOrder.subtotal = Number((patchOrder.quantity * unitPrice).toFixed(2));
                yield orderProductRepository.save(patchOrder);
            }
        }
        for (let i = 0; i < toDelete.length; i++) {
            yield orderProductRepository.delete(orderProduct[i].id);
        }
        return `${quantity} ${product.name} was returned, deducing R$ ${totalPrice} from the total price.`;
    }
    catch (err) {
        throw new appError_1.default(err.message, err.statusCode);
    }
});
exports.orderProductDeleteService = orderProductDeleteService;
