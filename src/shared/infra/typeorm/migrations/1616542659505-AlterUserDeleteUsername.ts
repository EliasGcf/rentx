import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

import { USERS_TABLE_NAME } from '../utils';

export class AlterUserDeleteUsername1616542659505 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(USERS_TABLE_NAME, 'username');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      USERS_TABLE_NAME,
      new TableColumn({
        name: 'username',
        type: 'varchar',
        isUnique: true,
      }),
    );
  }
}
