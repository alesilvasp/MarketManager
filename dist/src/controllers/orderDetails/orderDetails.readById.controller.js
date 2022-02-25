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
exports.orderDetailsreadByIdController = void 0;
const orderDetails_readById_service_1 = require("../../services/orderDetails/orderDetails.readById.service");
const orderDetailsreadByIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { order_id } = req.params;
        const orderDetailsRead = yield (0, orderDetails_readById_service_1.orderDetailsReadByIdService)(Number(order_id));
        return res.status(200).json(orderDetailsRead);
    }
    catch (error) {
        next(error);
    }
});
exports.orderDetailsreadByIdController = orderDetailsreadByIdController;
