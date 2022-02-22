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
exports.createEntities1645434615348 = void 0;
class createEntities1645434615348 {
    constructor() {
        this.name = 'createEntities1645434615348';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "logs" ("id" SERIAL NOT NULL, "login" TIMESTAMP NOT NULL DEFAULT now(), "logout" TIMESTAMP, "session_time" TIMESTAMP, "userId" uuid, "cashierId" integer, CONSTRAINT "PK_fb1b805f2f7795de79fa69340ba" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "isAdm" boolean NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "product_category" ("id" SERIAL NOT NULL, "category" text NOT NULL, CONSTRAINT "UQ_2002930a8a1654d82f32c67bf82" UNIQUE ("category"), CONSTRAINT "PK_0dce9bc93c2d2c399982d04bef1" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "returned_product" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL, "subtotal" double precision NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "productId" integer, CONSTRAINT "PK_31b514f3fb0d828dc4008c6d616" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "stock_product" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "stock" double precision NOT NULL, "batch" character varying NOT NULL, "expires_in" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_8a50fab16ec194487e4571d8e03" UNIQUE ("name"), CONSTRAINT "PK_375ba760c8cff338fc8c94b416c" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "price" double precision NOT NULL, "for_sale" integer NOT NULL, "unit" character varying NOT NULL, "stockProductId" integer, "categoryId" integer, CONSTRAINT "REL_9d1af047c173c0f8dd3afc60a1" UNIQUE ("stockProductId"), CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "order_details" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL, "total" double precision NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "cashierId" integer, CONSTRAINT "PK_278a6e0f21c9db1653e6f406801" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "order_product" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL, "subtotal" double precision NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "productId" integer, "cashierId" integer, "orderId" integer, CONSTRAINT "PK_539ede39e518562dfdadfddb492" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "cashier" ("id" SERIAL NOT NULL, "subtotal" double precision NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "balance" double precision NOT NULL, "userId" uuid, CONSTRAINT "REL_aefe7e456026b84732ed7edc98" UNIQUE ("userId"), CONSTRAINT "PK_c90575bda3993c4112a4d50e94e" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "reset_token" ("id" SERIAL NOT NULL, "token" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "REL_1d61419c157e5325204cbee7a2" UNIQUE ("userId"), CONSTRAINT "PK_93e1171b4a87d2d0478295f1a99" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`ALTER TABLE "logs" ADD CONSTRAINT "FK_a1196a1956403417fe3a0343390" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "logs" ADD CONSTRAINT "FK_81e8da2f7ef007b0976a0b46ec7" FOREIGN KEY ("cashierId") REFERENCES "cashier"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "returned_product" ADD CONSTRAINT "FK_f311573436d548902d2df8ad671" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_9d1af047c173c0f8dd3afc60a1b" FOREIGN KEY ("stockProductId") REFERENCES "stock_product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_ff0c0301a95e517153df97f6812" FOREIGN KEY ("categoryId") REFERENCES "product_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "order_details" ADD CONSTRAINT "FK_ce978e561dfd98eda3b63fe80ef" FOREIGN KEY ("cashierId") REFERENCES "cashier"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "order_product" ADD CONSTRAINT "FK_073c85ed133e05241040bd70f02" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "order_product" ADD CONSTRAINT "FK_35472af710f9aaba38fc4ab0448" FOREIGN KEY ("cashierId") REFERENCES "cashier"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "order_product" ADD CONSTRAINT "FK_3fb066240db56c9558a91139431" FOREIGN KEY ("orderId") REFERENCES "order_details"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "cashier" ADD CONSTRAINT "FK_aefe7e456026b84732ed7edc98d" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "reset_token" ADD CONSTRAINT "FK_1d61419c157e5325204cbee7a28" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "reset_token" DROP CONSTRAINT "FK_1d61419c157e5325204cbee7a28"`);
            yield queryRunner.query(`ALTER TABLE "cashier" DROP CONSTRAINT "FK_aefe7e456026b84732ed7edc98d"`);
            yield queryRunner.query(`ALTER TABLE "order_product" DROP CONSTRAINT "FK_3fb066240db56c9558a91139431"`);
            yield queryRunner.query(`ALTER TABLE "order_product" DROP CONSTRAINT "FK_35472af710f9aaba38fc4ab0448"`);
            yield queryRunner.query(`ALTER TABLE "order_product" DROP CONSTRAINT "FK_073c85ed133e05241040bd70f02"`);
            yield queryRunner.query(`ALTER TABLE "order_details" DROP CONSTRAINT "FK_ce978e561dfd98eda3b63fe80ef"`);
            yield queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_ff0c0301a95e517153df97f6812"`);
            yield queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_9d1af047c173c0f8dd3afc60a1b"`);
            yield queryRunner.query(`ALTER TABLE "returned_product" DROP CONSTRAINT "FK_f311573436d548902d2df8ad671"`);
            yield queryRunner.query(`ALTER TABLE "logs" DROP CONSTRAINT "FK_81e8da2f7ef007b0976a0b46ec7"`);
            yield queryRunner.query(`ALTER TABLE "logs" DROP CONSTRAINT "FK_a1196a1956403417fe3a0343390"`);
            yield queryRunner.query(`DROP TABLE "reset_token"`);
            yield queryRunner.query(`DROP TABLE "cashier"`);
            yield queryRunner.query(`DROP TABLE "order_product"`);
            yield queryRunner.query(`DROP TABLE "order_details"`);
            yield queryRunner.query(`DROP TABLE "product"`);
            yield queryRunner.query(`DROP TABLE "stock_product"`);
            yield queryRunner.query(`DROP TABLE "returned_product"`);
            yield queryRunner.query(`DROP TABLE "product_category"`);
            yield queryRunner.query(`DROP TABLE "user"`);
            yield queryRunner.query(`DROP TABLE "logs"`);
        });
    }
}
exports.createEntities1645434615348 = createEntities1645434615348;
