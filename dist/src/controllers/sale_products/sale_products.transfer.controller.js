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
exports.saleProductController = void 0;
const sale_product_service_1 = require("../../services/sale_product/sale_product.service");
const appError_1 = __importDefault(require("../../errors/appError"));
const saleProductController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        if (typeof body.quantity !== "number") {
            throw new appError_1.default("Quantity must be a number.", 400);
        }
        const forSaleProduct = yield (0, sale_product_service_1.saleProductService)(body);
        return res.status(200).json({
            message: "For each batch will be tranfered the current quantity:",
            info: forSaleProduct,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.saleProductController = saleProductController;
