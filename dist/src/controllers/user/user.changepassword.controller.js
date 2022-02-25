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
exports.userChangePasswordController = void 0;
const user_changepassword_service_1 = require("../../services/user/user.changepassword.service");
const userChangePasswordController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { token, new_password } = req.body;
    try {
        const changed = yield (0, user_changepassword_service_1.userChangePasswordService)(token, new_password);
        res.json({ message: changed });
    }
    catch (error) {
        next(error);
    }
});
exports.userChangePasswordController = userChangePasswordController;
