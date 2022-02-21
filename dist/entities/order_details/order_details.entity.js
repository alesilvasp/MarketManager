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
exports.OrderDetails = void 0;
const typeorm_1 = require("typeorm");
const cashier_entity_1 = require("../cashier/cashier.entity");
const order_product_entity_1 = require("../order_product/order_product.entity");
let OrderDetails = class OrderDetails {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], OrderDetails.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], OrderDetails.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)('float'),
    __metadata("design:type", Number)
], OrderDetails.prototype, "total", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", String)
], OrderDetails.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => order_product_entity_1.OrderProduct, order_product => order_product.order, {
        eager: true
    }),
    __metadata("design:type", Array)
], OrderDetails.prototype, "order_products", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => cashier_entity_1.Cashier, cashier => cashier.order_details),
    __metadata("design:type", cashier_entity_1.Cashier)
], OrderDetails.prototype, "cashier", void 0);
OrderDetails = __decorate([
    (0, typeorm_1.Entity)()
], OrderDetails);
exports.OrderDetails = OrderDetails;
