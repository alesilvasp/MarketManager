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
exports.cashierLogoutService = void 0;
const typeorm_1 = require("typeorm");
const entities_1 = require("../../entities");
const appError_1 = __importDefault(require("../../errors/appError"));
const cashierLogoutService = (uuid, cashier_id) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = (0, typeorm_1.getRepository)(entities_1.User);
    const cashierRepository = (0, typeorm_1.getRepository)(entities_1.Cashier);
    const logsRepository = (0, typeorm_1.getRepository)(entities_1.Logs);
    const user = yield userRepository.findOne({ id: uuid });
    if (!user) {
        throw new appError_1.default("User not found", 404);
    }
    let cashier = yield cashierRepository.findOneOrFail({ id: cashier_id });
    if (!cashier) {
        throw new appError_1.default("Cashier not found", 404);
    }
    if (!cashier.user) {
        throw new appError_1.default("Cashier is not being used", 401);
    }
    if (cashier.user.id !== user.id) {
        throw new appError_1.default("Trying to logout from wrong Cashier", 401);
    }
    const fakeCashier = { user: null };
    cashier = Object.assign(cashier, fakeCashier);
    yield cashierRepository.save(cashier);
    // const log = await logsRepository.findOne({
    //     where: {
    //         user: user,
    //         logout: null
    //     }
    // })
    // if (log) {
    //     log.logout = new Date()
    //     log.session_time = intervalToDuration({
    //         start: log.login
    //     })
    // }
    return cashier;
});
exports.cashierLogoutService = cashierLogoutService;
