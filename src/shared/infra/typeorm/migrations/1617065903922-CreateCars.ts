import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import {
  CARS_TABLE_NAME,
  CATEGORIES_TABLE_NAME,
  created_at_column,
  id_column,
} from '../utils';

export class CreateCars1617065903922 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: CARS_TABLE_NAME,
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
          {
            name: 'daily_rate',
            type: 'numeric',
          },
          {
            name: 'available',
            type: 'boolean',
            default: true,
          },
          {
            name: 'license_plate',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'fine_amount',
            type: 'numeric',
          },
          {
            name: 'brand',
            type: 'varchar',
          },
          {
            name: 'category_id',
            type: id_column.type,
            isNullable: true,
          },
          created_at_column,
        ],
        foreignKeys: [
          {
            name: `fk_${CARS_TABLE_NAME}_category_id`,
            referencedTableName: CATEGORIES_TABLE_NAME,
            referencedColumnNames: ['id'],
            columnNames: ['category_id'],
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(CARS_TABLE_NAME);
  }
}
