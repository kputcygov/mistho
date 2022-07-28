import { MigrationInterface, QueryRunner } from "typeorm";

export class initial1658972419602 implements MigrationInterface {
    name = 'initial1658972419602'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."schedulers_history_status_enum" AS ENUM('succeeded', 'failed')`);
        await queryRunner.query(`CREATE TABLE "schedulers_history" ("id" SERIAL NOT NULL, "schedulerId" integer NOT NULL, "status" "public"."schedulers_history_status_enum" NOT NULL DEFAULT 'succeeded', "error" character varying(500) NOT NULL, "last_run_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3d1282d2daa3dae8f46cb8aa3b2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."scraper_type_enum" AS ENUM('css', 'xpath')`);
        await queryRunner.query(`CREATE TABLE "scraper" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "url" character varying(500) NOT NULL, "selectors" text array NOT NULL DEFAULT '{}', "type" "public"."scraper_type_enum" NOT NULL DEFAULT 'css', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_29dd98b0cceac88740b4e4a3970" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."scheduler_status_enum" AS ENUM('created', 'creating', 'failed')`);
        await queryRunner.query(`CREATE TABLE "scheduler" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "expression" character varying(100) NOT NULL, "cronjobId" integer NOT NULL, "status" "public"."scheduler_status_enum" NOT NULL DEFAULT 'created', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "scraperId" integer, CONSTRAINT "REL_a95a511ef9db3e3ae1e754f7cd" UNIQUE ("scraperId"), CONSTRAINT "PK_c11a0f76186d81647aeefd54c72" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "scheduler" ADD CONSTRAINT "FK_a95a511ef9db3e3ae1e754f7cd4" FOREIGN KEY ("scraperId") REFERENCES "scraper"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "scheduler" DROP CONSTRAINT "FK_a95a511ef9db3e3ae1e754f7cd4"`);
        await queryRunner.query(`DROP TABLE "scheduler"`);
        await queryRunner.query(`DROP TYPE "public"."scheduler_status_enum"`);
        await queryRunner.query(`DROP TABLE "scraper"`);
        await queryRunner.query(`DROP TYPE "public"."scraper_type_enum"`);
        await queryRunner.query(`DROP TABLE "schedulers_history"`);
        await queryRunner.query(`DROP TYPE "public"."schedulers_history_status_enum"`);
    }

}
