import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import {
  id_column,
  created_at_column,
  USERS_TABLE_NAME,
  USERS_TOKENS_TABLE_NAME,
} from '../utils';

export class CreateUsersTokens1617760387655 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: USERS_TOKENS_TABLE_NAME,
        columns: [
          id_column,
          {
            name: 'refresh_token',
            type: 'varchar',
          },
          {
            name: 'user_id',
            type: id_column.type,
          },
          {
            name: 'expires_date',
            type: 'timestamp',
          },
          created_at_column,
        ],
        foreignKeys: [
          {
            name: `fk_${USERS_TOKENS_TABLE_NAME}_user_id`,
            referencedTableName: USERS_TABLE_NAME,
            referencedColumnNames: ['id'],
            columnNames: ['user_id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(USERS_TOKENS_TABLE_NAME);
  }
}
