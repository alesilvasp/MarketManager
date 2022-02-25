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
exports.cashierLoginService = void 0;
const typeorm_1 = require("typeorm");
const entities_1 = require("../../entities");
const appError_1 = __importDefault(require("../../errors/appError"));
const bcrypt = __importStar(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_config_1 = require("../../config/jwt.config");
const cashierLoginService = (body, cashier_id) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = body;
    const userRepository = (0, typeorm_1.getRepository)(entities_1.User);
    const cashierRepository = (0, typeorm_1.getRepository)(entities_1.Cashier);
    const logsRepository = (0, typeorm_1.getRepository)(entities_1.Logs);
    const user = yield userRepository.findOne({ email: email });
    const cashier = yield cashierRepository.findOne({ id: cashier_id });
    const cashiers = yield cashierRepository.find();
    console.log(user);
    if (!user) {
        throw new appError_1.default("Wrong password/email", 401);
    }
    if (!cashier) {
        throw new appError_1.default("Cashier not found", 404);
    }
    const pwdMatch = yield bcrypt.compare(password, user.password);
    const userIsLogged = cashiers.find(item => item.user === user);
    console.log(userIsLogged);
    if (userIsLogged) {
        throw new appError_1.default("This user is already logged in in another cashier", 401);
    }
    if (!cashier.user && pwdMatch && !user.isAdm) {
        const newLog = new entities_1.Logs();
        newLog.login = new Date();
        newLog.user = user;
        newLog.cashier = cashier;
        yield logsRepository.save(newLog);
        cashier.user = user;
        yield cashierRepository.save(cashier);
        const token = jsonwebtoken_1.default.sign({
            id: user.id,
            name: user.name,
            email: user.email,
            isAdm: user.isAdm
        }, jwt_config_1.config.secret, { expiresIn: jwt_config_1.config.expiresIn });
        return token;
    }
    else if (!cashier.user && pwdMatch && user.isAdm) {
        const newLog = new entities_1.Logs();
        newLog.login = new Date();
        newLog.user = user;
        newLog.cashier = cashier;
        yield logsRepository.save(newLog);
        cashier.user = user;
        yield cashierRepository.save(cashier);
    }
    else if (cashier.user) {
        throw new appError_1.default("Cashier is already been used", 401);
    }
    else if (!pwdMatch) {
        throw new appError_1.default("Wrong password/email", 401);
    }
});
exports.cashierLoginService = cashierLoginService;
