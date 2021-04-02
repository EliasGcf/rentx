import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import { SPECIFICATIONS_TABLE_NAME, created_at_column, id_column } from '../utils';

export class CreateSpecifications1616463126269 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: SPECIFICATIONS_TABLE_NAME,
        columns: [
          id_column,
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          created_at_column,
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(SPECIFICATIONS_TABLE_NAME);
  }
}
