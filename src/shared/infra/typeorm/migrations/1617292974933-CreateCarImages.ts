import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import {
  CARS_IMAGE_TABLE_NAME,
  CARS_TABLE_NAME,
  id_column,
  created_at_column,
} from '../utils';

export class CreateCarImages1617292974933 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: CARS_IMAGE_TABLE_NAME,
        columns: [
          id_column,
          {
            name: 'car_id',
            type: id_column.type,
          },
          {
            name: 'image_name',
            type: 'varchar',
          },
          created_at_column,
        ],
        foreignKeys: [
          {
            name: `fk_${CARS_IMAGE_TABLE_NAME}_car_id`,
            referencedTableName: CARS_TABLE_NAME,
            referencedColumnNames: ['id'],
            columnNames: ['car_id'],
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(CARS_IMAGE_TABLE_NAME);
  }
}
