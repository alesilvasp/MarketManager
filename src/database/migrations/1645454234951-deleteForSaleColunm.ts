import {MigrationInterface, QueryRunner} from "typeorm";

export class deleteForSaleColunm1645454234951 implements MigrationInterface {
    name = 'deleteForSaleColunm1645454234951'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "for_sale"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ADD "for_sale" integer NOT NULL`);
    }

}
