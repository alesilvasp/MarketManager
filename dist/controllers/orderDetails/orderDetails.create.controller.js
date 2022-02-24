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
exports.orderDetailsCreateController = void 0;
const orderDetails_create_service_1 = require("../../services/orderDetails/orderDetails.create.service");
const orderDetailsCreateController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cashier_id } = req.params;
        const orderDetailsCreate = yield (0, orderDetails_create_service_1.orderDetailsCreateService)(Number(cashier_id));
        return res.status(201).json(orderDetailsCreate);
    }
    catch (error) {
        next(error);
    }
});
exports.orderDetailsCreateController = orderDetailsCreateController;
