import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitMigration1695050087803 implements MigrationInterface {
  name = 'InitMigration1695050087803';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "todo" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "task" character varying NOT NULL, "description" character varying NOT NULL, "status" "public"."todo_status_enum" NOT NULL DEFAULT 'pending', "priority" integer NOT NULL, "due_date" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_d429b7114371f6a35c5cb4776a7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b12accc5a9ede5b3ffd5f26a3d" ON "todo" ("status") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ebe1f7c786b43fb1142694ccc9" ON "todo" ("priority") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ad20f4d8093859f842fecc07f4" ON "todo" ("due_date") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_ad20f4d8093859f842fecc07f4"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_ebe1f7c786b43fb1142694ccc9"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b12accc5a9ede5b3ffd5f26a3d"`,
    );
    await queryRunner.query(`DROP TABLE "todo"`);
  }
}
