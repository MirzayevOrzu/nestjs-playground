import { MigrationInterface, QueryRunner } from 'typeorm';

export class Article1657701776235 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "article" RENAME COLUMN "title" to "name"`,
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "article" RENAME COLUMN "name" to "title"`,
    );
  }
}
