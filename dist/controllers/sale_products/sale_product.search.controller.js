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
exports.saleProductSearchController = void 0;
const sale_product_search_service_1 = require("../../services/sale_product/sale_product.search.service");
const saleProductSearchController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { product_id } = req.params;
        const searchInfo = yield (0, sale_product_search_service_1.saleProductSearchService)(product_id);
        return res.status(200).json(searchInfo);
    }
    catch (err) {
        next(err);
    }
});
exports.saleProductSearchController = saleProductSearchController;
