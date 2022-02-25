"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.userChangePasswordService = void 0;
const entities_1 = require("../../entities");
const typeorm_1 = require("typeorm");
const appError_1 = __importDefault(require("../../errors/appError"));
const bcrypt = __importStar(require("bcryptjs"));
const userChangePasswordService = (token, new_password) => __awaiter(void 0, void 0, void 0, function* () {
    const resetTokenRepository = (0, typeorm_1.getRepository)(entities_1.ResetToken);
    const userRepository = (0, typeorm_1.getRepository)(entities_1.User);
    const userToken = yield resetTokenRepository.findOne({ token: token });
    if (!token) {
        throw new appError_1.default("Invalid recovery token", 401);
    }
    if (userToken) {
        const isValid = bcrypt.compare(token, userToken.token);
        if (!isValid) {
            throw new appError_1.default("Invalid recovery token", 401);
        }
        let userId = userToken.user.id;
        const user = yield userRepository.findOne({ where: { id: userId } });
        if (user) {
            user.password = yield bcrypt.hash(new_password, 10);
            yield userRepository.save(user);
            yield resetTokenRepository.delete(userToken);
            return "Password changed successfully";
        }
        else {
            throw new appError_1.default("User not found", 404);
        }
    }
});
exports.userChangePasswordService = userChangePasswordService;
