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
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderProductDeleteController = void 0;
const orderProduct_1 = require("../../services/orderProduct");
const orderProductDeleteController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const { product_id } = req.params;
        const orderProductCreate = yield (0, orderProduct_1.orderProductDeleteService)(Number(product_id), body);
        return res.status(200).json({ message: orderProductCreate });
    }
    catch (error) {
        next(error);
    }
});
exports.orderProductDeleteController = orderProductDeleteController;
