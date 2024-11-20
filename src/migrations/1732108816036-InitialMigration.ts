import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1732108816036 implements MigrationInterface {
    name = 'InitialMigration1732108816036'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "news_post" ("id" SERIAL NOT NULL, "title" text NOT NULL DEFAULT '', "content" text NOT NULL DEFAULT '', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f3da2059a86af58f909bded384c" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "news_post"`);
    }

}
