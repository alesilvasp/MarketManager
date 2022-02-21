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
exports.Product = void 0;
const typeorm_1 = require("typeorm");
const order_product_entity_1 = require("../order_product/order_product.entity");
const product_category_entity_1 = require("../product_category/product_category.entity");
const returned_product_entity_1 = require("../returned_product/returned_product.entity");
const stock_product_entity_1 = require("../stock_product/stock_product.entity");
const sale_product_entity_1 = require("../sale_product/sale_product.entity");
let Product = class Product {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Product.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)("float"),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Product.prototype, "for_sale", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "unit", void 0);
__decorate([
    (0, typeorm_1.OneToOne)((type) => sale_product_entity_1.SaleProduct, {
        eager: true,
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", sale_product_entity_1.SaleProduct)
], Product.prototype, "sale_product", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((type) => returned_product_entity_1.ReturnedProduct, (returned) => returned.product),
    __metadata("design:type", Array)
], Product.prototype, "returned", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((type) => stock_product_entity_1.StockProduct, (stock_product) => stock_product.product, {
        eager: true,
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], Product.prototype, "stock_product", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((type) => order_product_entity_1.OrderProduct, (order_product) => order_product.product),
    __metadata("design:type", Array)
], Product.prototype, "order_products", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => product_category_entity_1.ProductCategory, (category) => category.products, {
        eager: true,
    }),
    __metadata("design:type", product_category_entity_1.ProductCategory)
], Product.prototype, "category", void 0);
Product = __decorate([
    (0, typeorm_1.Entity)()
], Product);
exports.Product = Product;
