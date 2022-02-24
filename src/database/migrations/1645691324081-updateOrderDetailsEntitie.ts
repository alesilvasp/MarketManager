import {MigrationInterface, QueryRunner} from "typeorm";

export class updateOrderDetailsEntitie1645691324081 implements MigrationInterface {
    name = 'updateOrderDetailsEntitie1645691324081'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_details" DROP COLUMN "quantity"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_details" ADD "quantity" integer NOT NULL`);
    }

}
