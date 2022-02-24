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
exports.categoryUpdateService = void 0;
const typeorm_1 = require("typeorm");
const entities_1 = require("../../entities");
const appError_1 = __importDefault(require("../../errors/appError"));
const categoryUpdateService = (category_id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryRepository = (0, typeorm_1.getRepository)(entities_1.ProductCategory);
    try {
        const categoryToUpdate = yield categoryRepository.findOneOrFail(category_id);
        const { category } = data;
        if (typeof category !== "string") {
            throw new appError_1.default(`Category must be string`, 400);
        }
        const verified = category.toLowerCase();
        categoryToUpdate.category = verified;
        yield categoryRepository.save(categoryToUpdate);
        const categoryUpdated = yield categoryRepository.findOneOrFail(category_id);
        return categoryUpdated;
    }
    catch (error) {
        if (error.code === "23505") {
            throw new appError_1.default(`Category name already exists`, 409);
        }
        if (error.message.includes("ProductCategory")) {
            throw new appError_1.default(`Product id ${category_id} not found`, 404);
        }
        throw new appError_1.default(error.message, error.statusCode);
    }
});
exports.categoryUpdateService = categoryUpdateService;
