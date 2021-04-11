import { autoInjectable, inject } from 'tsyringe';
import { v4 as uuidV4 } from 'uuid';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

import { registerDependencies } from '@shared/container';
import { IHashProvider } from '@shared/container/providers';
import { User } from '@modules/accounts/infra/typeorm/entities/User';

import { SEED_ADMIN_USER_EMAIL, SEED_ADMIN_USER_PASS } from '../utils';

registerDependencies();

@autoInjectable()
class CreateAdminUserSeed implements Seeder {
  constructor(
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async run(_: Factory, connection: Connection): Promise<void> {
    const id = uuidV4();
    const password = await this.hashProvider.generateHash(SEED_ADMIN_USER_PASS);

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

export default (CreateAdminUserSeed as unknown) as new () => Seeder;
