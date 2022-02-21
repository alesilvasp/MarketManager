import {MigrationInterface, QueryRunner} from "typeorm";

export class createSaleProductEntitie1645450292922 implements MigrationInterface {
    name = 'createSaleProductEntitie1645450292922'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_9d1af047c173c0f8dd3afc60a1b"`);
        await queryRunner.query(`ALTER TABLE "stock_product" RENAME COLUMN "name" TO "productId"`);
        await queryRunner.query(`ALTER TABLE "stock_product" RENAME CONSTRAINT "UQ_8a50fab16ec194487e4571d8e03" TO "UQ_146927c1def9f6bcc0e136afa73"`);
        await queryRunner.query(`ALTER TABLE "product" RENAME COLUMN "stockProductId" TO "saleProductId"`);
        await queryRunner.query(`ALTER TABLE "product" RENAME CONSTRAINT "REL_9d1af047c173c0f8dd3afc60a1" TO "UQ_d695156bf7f67d0caede7863309"`);
        await queryRunner.query(`CREATE TABLE "sale_product" ("id" SERIAL NOT NULL, "stock" double precision NOT NULL, CONSTRAINT "PK_4c90923fcc89bf8eeecd181fffc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "stock_product" DROP CONSTRAINT "UQ_146927c1def9f6bcc0e136afa73"`);
        await queryRunner.query(`ALTER TABLE "stock_product" DROP COLUMN "productId"`);
        await queryRunner.query(`ALTER TABLE "stock_product" ADD "productId" integer`);
        await queryRunner.query(`ALTER TABLE "stock_product" ADD CONSTRAINT "FK_146927c1def9f6bcc0e136afa73" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_d695156bf7f67d0caede7863309" FOREIGN KEY ("saleProductId") REFERENCES "sale_product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_d695156bf7f67d0caede7863309"`);
        await queryRunner.query(`ALTER TABLE "stock_product" DROP CONSTRAINT "FK_146927c1def9f6bcc0e136afa73"`);
        await queryRunner.query(`ALTER TABLE "stock_product" DROP COLUMN "productId"`);
        await queryRunner.query(`ALTER TABLE "stock_product" ADD "productId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "stock_product" ADD CONSTRAINT "UQ_146927c1def9f6bcc0e136afa73" UNIQUE ("productId")`);
        await queryRunner.query(`DROP TABLE "sale_product"`);
        await queryRunner.query(`ALTER TABLE "product" RENAME CONSTRAINT "UQ_d695156bf7f67d0caede7863309" TO "REL_9d1af047c173c0f8dd3afc60a1"`);
        await queryRunner.query(`ALTER TABLE "product" RENAME COLUMN "saleProductId" TO "stockProductId"`);
        await queryRunner.query(`ALTER TABLE "stock_product" RENAME CONSTRAINT "UQ_146927c1def9f6bcc0e136afa73" TO "UQ_8a50fab16ec194487e4571d8e03"`);
        await queryRunner.query(`ALTER TABLE "stock_product" RENAME COLUMN "productId" TO "name"`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_9d1af047c173c0f8dd3afc60a1b" FOREIGN KEY ("stockProductId") REFERENCES "stock_product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
