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
exports.categoryCreateController = void 0;
const category_create_service_1 = require("../../services/category/category.create.service");
const appError_1 = __importDefault(require("../../errors/appError"));
const categoryCreateController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (typeof req.body.category !== "string") {
            throw new appError_1.default("Category must be string.", 400);
        }
        const category = yield (0, category_create_service_1.categoryCreateService)(req.body.category);
        res.status(201).send(category);
    }
    catch (error) {
        next(error);
    }
});
exports.categoryCreateController = categoryCreateController;
