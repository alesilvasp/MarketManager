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
exports.orderDetailsReadService = void 0;
const typeorm_1 = require("typeorm");
const entities_1 = require("../../entities");
const appError_1 = __importDefault(require("../../errors/appError"));
const orderDetailsReadService = (cashier_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderDetailsRepository = (0, typeorm_1.getRepository)(entities_1.OrderDetails);
        const cashierRepository = (0, typeorm_1.getRepository)(entities_1.Cashier);
        const cashier = yield cashierRepository.findOneOrFail(cashier_id, {
            relations: ["order_products"],
        });
        const orderDetails = yield orderDetailsRepository.find({
            relations: ["cashier"],
        });
        const filterOrderDetails = orderDetails.filter((order) => order.cashier.id == cashier_id);
        return filterOrderDetails;
    }
    catch (error) {
        if (error.message.includes("Cashier")) {
            throw new appError_1.default(`Cashier id ${cashier_id} do not exists`, 404);
        }
    }
});
exports.orderDetailsReadService = orderDetailsReadService;
