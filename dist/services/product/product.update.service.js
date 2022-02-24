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
exports.productUpdateService = void 0;
const typeorm_1 = require("typeorm");
const entities_1 = require("../../entities");
const appError_1 = __importDefault(require("../../errors/appError"));
const productUpdateService = (product_id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const productRepository = (0, typeorm_1.getRepository)(entities_1.Product);
    try {
        const productToUpdate = yield productRepository.findOneOrFail(product_id);
        const toVerify = Object.entries(data).map((item) => item.map((values) => typeof values === "string" ? values.toLowerCase() : values));
        const verified = Object.fromEntries(toVerify);
        yield productRepository.save(Object.assign(Object.assign({}, productToUpdate), verified));
        const productUpdated = yield productRepository.findOneOrFail(product_id);
        return productUpdated;
    }
    catch (error) {
        if (error.code === "23503") {
            throw new appError_1.default(`Category id ${data.category} not found`, 404); // category_Id
        }
        if (error.message.includes("Product")) {
            throw new appError_1.default(`Product id ${product_id} not found`, 404);
        }
    }
});
exports.productUpdateService = productUpdateService;
