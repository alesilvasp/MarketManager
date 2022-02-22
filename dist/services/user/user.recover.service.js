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
exports.userRecoverService = void 0;
const typeorm_1 = require("typeorm");
const entities_1 = require("../../entities");
const entities_2 = require("../../entities");
const appError_1 = __importDefault(require("../../errors/appError"));
const crypto_1 = __importDefault(require("crypto"));
const bcrypt = __importStar(require("bcryptjs"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const nodemailer_express_handlebars_1 = __importDefault(require("nodemailer-express-handlebars"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const userRecoverService = (userEmail) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = (0, typeorm_1.getRepository)(entities_1.User);
    const resetTokenRepository = (0, typeorm_1.getRepository)(entities_2.ResetToken);
    const user = yield userRepository.findOne({ email: userEmail });
    if (!user) {
        throw new appError_1.default("User not found", 404);
    }
    const token = yield resetTokenRepository.findOne({ where: { user: user } });
    if (token) {
        yield resetTokenRepository.delete(token);
    }
    let resetToken = crypto_1.default.randomBytes(32).toString("hex");
    let hash = yield bcrypt.hash(resetToken, 10);
    const newToken = new entities_2.ResetToken();
    newToken.created_at = new Date();
    newToken.token = hash;
    newToken.user = user;
    resetTokenRepository.create(newToken);
    yield resetTokenRepository.save(newToken);
    const transport = nodemailer_1.default.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_PASS,
        },
    });
    const handlebarOptions = {
        viewEngine: {
            partialsDir: path_1.default.resolve('./src/services/user/'),
            defaultLayout: undefined
        },
        viewPath: path_1.default.resolve('./src/services/user/')
    };
    transport.use('compile', (0, nodemailer_express_handlebars_1.default)(handlebarOptions));
    const mailOptions = {
        from: "market_manager@mail.com",
        to: user.email,
        subject: "Account Recover",
        template: 'user.recover',
        context: {
            user: user.name,
            token: hash
        }
    };
    transport.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.log(error);
        }
        return;
    });
    return "An e-mail was sent to you with a password recover token";
});
exports.userRecoverService = userRecoverService;
