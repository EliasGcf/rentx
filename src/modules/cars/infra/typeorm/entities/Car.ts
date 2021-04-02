import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import {
  CARS_TABLE_NAME,
  SPECIFICATIONS_CARS_TABLE_NAME,
  SPECIFICATIONS_CARS_COLUMN_CAR_NAME,
  SPECIFICATIONS_CARS_COLUMN_SPECIFICATION_NAME,
} from '@shared/infra/typeorm/utils';

import { Category } from './Category';
import { Specification } from './Specification';

@Entity(CARS_TABLE_NAME)
class Car {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  daily_rate: number;

  @Column()
  available: boolean;

  @Column()
  license_plate: string;

  @Column()
  fine_amount: number;

  @Column()
  brand: string;

  @Column()
  category_id: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToMany(() => Specification)
  @JoinTable({
    name: SPECIFICATIONS_CARS_TABLE_NAME,
    joinColumn: { name: SPECIFICATIONS_CARS_COLUMN_CAR_NAME },
    inverseJoinColumn: { name: SPECIFICATIONS_CARS_COLUMN_SPECIFICATION_NAME },
  })
  specifications: Specification[];

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
      this.available = true;
    }
  }
}

export { Car };
