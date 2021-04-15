import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { Expose } from 'class-transformer';
import { v4 as uuidV4 } from 'uuid';

import { env } from '@shared/env';
import { USERS_TABLE_NAME } from '@shared/infra/typeorm/utils';

import { uploadConfig } from '@config/upload';

@Entity(USERS_TABLE_NAME)
class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  driver_license: string;

  @Column()
  isAdmin: boolean;

  @Column()
  avatar: string;

  @CreateDateColumn()
  created_at: Date;

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string | null {
    if (!this.avatar) return null;
    console.log('AQUI');

    switch (uploadConfig.driver) {
      case 'disk':
        return `${env.APP_API_URL}/files/avatar/${this.avatar}`;
      case 's3':
        return `${env.AWS_BUCKET_URL}/avatar/${this.avatar}`;
      default:
        return null;
    }
  }

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { User };
