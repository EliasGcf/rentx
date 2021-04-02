import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

import { USERS_TABLE_NAME } from '../utils';

export class AlterUserAddAvatar1616552362225 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      USERS_TABLE_NAME,
      new TableColumn({
        name: 'avatar',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(USERS_TABLE_NAME, 'avatar');
  }
}
