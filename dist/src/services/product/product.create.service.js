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
exports.productCreateService = void 0;
const typeorm_1 = require("typeorm");
const appError_1 = __importDefault(require("../../errors/appError"));
const entities_1 = require("../../entities");
const productCreateService = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, price, unit, category_id } = body;
    try {
        const productRepository = (0, typeorm_1.getRepository)(entities_1.Product);
        const categoryRepository = (0, typeorm_1.getRepository)(entities_1.ProductCategory);
        const categoryFind = yield categoryRepository.findOneOrFail({
            id: category_id,
        });
        const newProduct = productRepository.create({
            name,
            description,
            price,
            unit,
            category: categoryFind,
            stock_product: [],
            order_products: [],
            returned: [],
        });
        yield productRepository.save(newProduct);
        return newProduct;
    }
    catch (error) {
        if (error.code === "23505") {
            throw new appError_1.default(`Product ${name} already exists`, 409);
        }
        throw new appError_1.default(`Category id ${category_id} not found`, 404);
    }
});
exports.productCreateService = productCreateService;
