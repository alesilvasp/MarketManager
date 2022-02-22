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
exports.categoryCreateService = void 0;
const typeorm_1 = require("typeorm");
const appError_1 = __importDefault(require("../../errors/appError"));
const entities_1 = require("../../entities");
const categoryCreateService = (category) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoryRepository = (0, typeorm_1.getRepository)(entities_1.ProductCategory);
        const newCategory = categoryRepository.create({
            category,
            products: [],
        });
        yield categoryRepository.save(newCategory);
        return newCategory;
    }
    catch (error) {
        throw new appError_1.default("Category already registered.", 409);
    }
});
exports.categoryCreateService = categoryCreateService;
