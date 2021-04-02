import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import {
  RENTS_TABLE_NAME,
  id_column,
  created_at_column,
  updated_at_column,
  CARS_TABLE_NAME,
  USERS_TABLE_NAME,
} from '../utils';

export class CreateRents1617323060944 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: RENTS_TABLE_NAME,
        columns: [
          id_column,
          {
            name: 'car_id',
            type: id_column.type,
          },
          {
            name: 'user_id',
            type: id_column.type,
          },
          {
            name: 'start_date',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'end_date',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'expected_return_date',
            type: 'timestamp',
          },
          {
            name: 'total',
            type: 'numeric',
            isNullable: true,
          },
          created_at_column,
          updated_at_column,
        ],
        foreignKeys: [
          {
            name: `fk_${RENTS_TABLE_NAME}_car_id`,
            referencedTableName: CARS_TABLE_NAME,
            referencedColumnNames: ['id'],
            columnNames: ['car_id'],
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          },
          {
            name: `fk_${RENTS_TABLE_NAME}user_id`,
            referencedTableName: USERS_TABLE_NAME,
            referencedColumnNames: ['id'],
            columnNames: ['user_id'],
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(RENTS_TABLE_NAME);
  }
}
