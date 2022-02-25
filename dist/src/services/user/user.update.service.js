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
exports.userUpdateService = void 0;
const typeorm_1 = require("typeorm");
const entities_1 = require("../../entities");
const appError_1 = __importDefault(require("../../errors/appError"));
const userUpdateService = (user_id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = (0, typeorm_1.getRepository)(entities_1.User);
    try {
        const userToUpdate = yield userRepository.findOne(user_id);
        if ("isAdm" in data || "logs" in data) {
            throw new appError_1.default("isAdm and logs fields cannot be changed!", 401);
        }
        if ("password" in data) {
            throw new appError_1.default("To change password, access recover page", 401);
        }
        return yield userRepository.save(Object.assign(Object.assign({}, userToUpdate), data));
    }
    catch (error) {
        if (error.code === "22P02") {
            throw new appError_1.default("User not found!", 404);
        }
        throw new appError_1.default(error.message, error.statusCode);
    }
});
exports.userUpdateService = userUpdateService;
