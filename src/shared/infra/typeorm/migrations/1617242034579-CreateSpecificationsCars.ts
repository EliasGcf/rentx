import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import {
  SPECIFICATIONS_CARS_TABLE_NAME,
  id_column,
  created_at_column,
  CARS_TABLE_NAME,
  SPECIFICATIONS_TABLE_NAME,
  SPECIFICATIONS_CARS_COLUMN_CAR_NAME,
  SPECIFICATIONS_CARS_COLUMN_SPECIFICATION_NAME,
} from '../utils';

export class CreateSpecificationsCars1617242034579 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: SPECIFICATIONS_CARS_TABLE_NAME,
        columns: [
          {
            name: SPECIFICATIONS_CARS_COLUMN_CAR_NAME,
            type: id_column.type,
          },
          {
            name: SPECIFICATIONS_CARS_COLUMN_SPECIFICATION_NAME,
            type: id_column.type,
          },
          created_at_column,
        ],
        foreignKeys: [
          {
            name: `fk_${SPECIFICATIONS_CARS_TABLE_NAME}_car_id`,
            referencedTableName: CARS_TABLE_NAME,
            referencedColumnNames: ['id'],
            columnNames: ['car_id'],
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          },
          {
            name: `fk_${SPECIFICATIONS_CARS_TABLE_NAME}_specification_id`,
            referencedTableName: SPECIFICATIONS_TABLE_NAME,
            referencedColumnNames: ['id'],
            columnNames: ['specification_id'],
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(SPECIFICATIONS_CARS_TABLE_NAME);
  }
}
