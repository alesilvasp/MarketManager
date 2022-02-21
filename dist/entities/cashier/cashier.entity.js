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
exports.Cashier = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../user/user.entity");
const logs_entity_1 = require("../logs/logs.entity");
const order_product_entity_1 = require("../order_product/order_product.entity");
const order_details_entity_1 = require("../order_details/order_details.entity");
let Cashier = class Cashier {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Cashier.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('float'),
    __metadata("design:type", Number)
], Cashier.prototype, "subtotal", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", String)
], Cashier.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)('float'),
    __metadata("design:type", Number)
], Cashier.prototype, "balance", void 0);
__decorate([
    (0, typeorm_1.OneToOne)((type) => user_entity_1.User, {
        eager: true,
        nullable: true
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", user_entity_1.User)
], Cashier.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => logs_entity_1.Logs, log => log.cashier),
    __metadata("design:type", Array)
], Cashier.prototype, "logs", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => order_product_entity_1.OrderProduct, order_product => order_product.cashier),
    __metadata("design:type", Array)
], Cashier.prototype, "order_products", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => order_details_entity_1.OrderDetails, order_details => order_details.cashier),
    __metadata("design:type", Array)
], Cashier.prototype, "order_details", void 0);
Cashier = __decorate([
    (0, typeorm_1.Entity)()
], Cashier);
exports.Cashier = Cashier;
