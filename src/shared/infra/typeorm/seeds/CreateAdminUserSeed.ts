import { hash } from 'bcryptjs';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { v4 as uuidV4 } from 'uuid';

import { User } from '@modules/accounts/infra/typeorm/entities/User';

export const SEED_ADMIN_USER_EMAIL = 'admin@rentx.com.br';
export const SEED_ADMIN_USER_PASS = 'admin';

export default class CreateAdminUserSeed implements Seeder {
  public async run(_: Factory, connection: Connection): Promise<void> {
    const id = uuidV4();
    const password = await hash(SEED_ADMIN_USER_PASS, 8);

    const usersOrmRepository = connection.getRepository(User);

    const adminUser = usersOrmRepository.create({
      id,
      name: 'Administrator',
      email: SEED_ADMIN_USER_EMAIL,
      password,
      isAdmin: true,
      driver_license: 'XXXXXX',
    });

    await usersOrmRepository.save(adminUser);
  }
}
