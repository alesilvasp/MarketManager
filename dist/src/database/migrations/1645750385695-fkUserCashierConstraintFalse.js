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
exports.fkUserCashierConstraintFalse1645750385695 = void 0;
class fkUserCashierConstraintFalse1645750385695 {
    constructor() {
        this.name = 'fkUserCashierConstraintFalse1645750385695';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "cashier" DROP CONSTRAINT "FK_aefe7e456026b84732ed7edc98d"`);
            yield queryRunner.query(`ALTER TABLE "cashier" DROP CONSTRAINT "REL_aefe7e456026b84732ed7edc98"`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "cashier" ADD CONSTRAINT "REL_aefe7e456026b84732ed7edc98" UNIQUE ("userId")`);
            yield queryRunner.query(`ALTER TABLE "cashier" ADD CONSTRAINT "FK_aefe7e456026b84732ed7edc98d" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
}
exports.fkUserCashierConstraintFalse1645750385695 = fkUserCashierConstraintFalse1645750385695;
