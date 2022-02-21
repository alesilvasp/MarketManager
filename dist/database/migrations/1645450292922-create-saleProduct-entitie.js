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
exports.createSaleProductEntitie1645450292922 = void 0;
class createSaleProductEntitie1645450292922 {
    constructor() {
        this.name = 'createSaleProductEntitie1645450292922';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_9d1af047c173c0f8dd3afc60a1b"`);
            yield queryRunner.query(`ALTER TABLE "stock_product" RENAME COLUMN "name" TO "productId"`);
            yield queryRunner.query(`ALTER TABLE "stock_product" RENAME CONSTRAINT "UQ_8a50fab16ec194487e4571d8e03" TO "UQ_146927c1def9f6bcc0e136afa73"`);
            yield queryRunner.query(`ALTER TABLE "product" RENAME COLUMN "stockProductId" TO "saleProductId"`);
            yield queryRunner.query(`ALTER TABLE "product" RENAME CONSTRAINT "REL_9d1af047c173c0f8dd3afc60a1" TO "UQ_d695156bf7f67d0caede7863309"`);
            yield queryRunner.query(`CREATE TABLE "sale_product" ("id" SERIAL NOT NULL, "stock" double precision NOT NULL, CONSTRAINT "PK_4c90923fcc89bf8eeecd181fffc" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`ALTER TABLE "stock_product" DROP CONSTRAINT "UQ_146927c1def9f6bcc0e136afa73"`);
            yield queryRunner.query(`ALTER TABLE "stock_product" DROP COLUMN "productId"`);
            yield queryRunner.query(`ALTER TABLE "stock_product" ADD "productId" integer`);
            yield queryRunner.query(`ALTER TABLE "stock_product" ADD CONSTRAINT "FK_146927c1def9f6bcc0e136afa73" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_d695156bf7f67d0caede7863309" FOREIGN KEY ("saleProductId") REFERENCES "sale_product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_d695156bf7f67d0caede7863309"`);
            yield queryRunner.query(`ALTER TABLE "stock_product" DROP CONSTRAINT "FK_146927c1def9f6bcc0e136afa73"`);
            yield queryRunner.query(`ALTER TABLE "stock_product" DROP COLUMN "productId"`);
            yield queryRunner.query(`ALTER TABLE "stock_product" ADD "productId" character varying NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "stock_product" ADD CONSTRAINT "UQ_146927c1def9f6bcc0e136afa73" UNIQUE ("productId")`);
            yield queryRunner.query(`DROP TABLE "sale_product"`);
            yield queryRunner.query(`ALTER TABLE "product" RENAME CONSTRAINT "UQ_d695156bf7f67d0caede7863309" TO "REL_9d1af047c173c0f8dd3afc60a1"`);
            yield queryRunner.query(`ALTER TABLE "product" RENAME COLUMN "saleProductId" TO "stockProductId"`);
            yield queryRunner.query(`ALTER TABLE "stock_product" RENAME CONSTRAINT "UQ_146927c1def9f6bcc0e136afa73" TO "UQ_8a50fab16ec194487e4571d8e03"`);
            yield queryRunner.query(`ALTER TABLE "stock_product" RENAME COLUMN "productId" TO "name"`);
            yield queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_9d1af047c173c0f8dd3afc60a1b" FOREIGN KEY ("stockProductId") REFERENCES "stock_product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
}
exports.createSaleProductEntitie1645450292922 = createSaleProductEntitie1645450292922;
