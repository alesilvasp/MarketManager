import {MigrationInterface, QueryRunner} from "typeorm";

export class fkUserCashierConstraintFalse1645750385695 implements MigrationInterface {
    name = 'fkUserCashierConstraintFalse1645750385695'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cashier" DROP CONSTRAINT "FK_aefe7e456026b84732ed7edc98d"`);
        await queryRunner.query(`ALTER TABLE "cashier" DROP CONSTRAINT "REL_aefe7e456026b84732ed7edc98"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cashier" ADD CONSTRAINT "REL_aefe7e456026b84732ed7edc98" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "cashier" ADD CONSTRAINT "FK_aefe7e456026b84732ed7edc98d" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
