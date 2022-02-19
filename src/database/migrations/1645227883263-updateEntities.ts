import {MigrationInterface, QueryRunner} from "typeorm";

export class updateEntities1645227883263 implements MigrationInterface {
    name = 'updateEntities1645227883263'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "logs" DROP CONSTRAINT "FK_a1196a1956403417fe3a0343390"`);
        await queryRunner.query(`ALTER TABLE "cashier" DROP CONSTRAINT "FK_aefe7e456026b84732ed7edc98d"`);
        await queryRunner.query(`ALTER TABLE "reset_token" DROP CONSTRAINT "FK_1d61419c157e5325204cbee7a28"`);
        await queryRunner.query(`ALTER TABLE "logs" ADD CONSTRAINT "FK_a1196a1956403417fe3a0343390" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cashier" ADD CONSTRAINT "FK_aefe7e456026b84732ed7edc98d" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reset_token" ADD CONSTRAINT "FK_1d61419c157e5325204cbee7a28" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reset_token" DROP CONSTRAINT "FK_1d61419c157e5325204cbee7a28"`);
        await queryRunner.query(`ALTER TABLE "cashier" DROP CONSTRAINT "FK_aefe7e456026b84732ed7edc98d"`);
        await queryRunner.query(`ALTER TABLE "logs" DROP CONSTRAINT "FK_a1196a1956403417fe3a0343390"`);
        await queryRunner.query(`ALTER TABLE "reset_token" ADD CONSTRAINT "FK_1d61419c157e5325204cbee7a28" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cashier" ADD CONSTRAINT "FK_aefe7e456026b84732ed7edc98d" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "logs" ADD CONSTRAINT "FK_a1196a1956403417fe3a0343390" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
