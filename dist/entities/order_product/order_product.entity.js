"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderProduct = void 0;
const typeorm_1 = require("typeorm");
const product_entity_1 = require("../product/product.entity");
const order_details_entity_1 = require("../order_details/order_details.entity");
const cashier_entity_1 = require("../cashier/cashier.entity");
let OrderProduct = class OrderProduct {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], OrderProduct.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], OrderProduct.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)('float'),
    __metadata("design:type", Number)
], OrderProduct.prototype, "subtotal", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", String)
], OrderProduct.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => product_entity_1.Product, product => product.order_products, {
        eager: true
    }),
    __metadata("design:type", product_entity_1.Product)
], OrderProduct.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => cashier_entity_1.Cashier, cashier => cashier.order_products),
    __metadata("design:type", cashier_entity_1.Cashier)
], OrderProduct.prototype, "cashier", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => order_details_entity_1.OrderDetails, order_details => order_details.order_products),
    __metadata("design:type", order_details_entity_1.OrderDetails)
], OrderProduct.prototype, "order", void 0);
OrderProduct = __decorate([
    (0, typeorm_1.Entity)()
], OrderProduct);
exports.OrderProduct = OrderProduct;
