import { getRepository, Repository } from 'typeorm';

import { User } from '@modules/accounts/entities';
import { ICreateUserDTO } from '@modules/accounts/dtos';
import { IUsersRepository } from '@modules/accounts/repositories';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  async create({ name, email, password, driver_license }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({
      name,
      email,
      password,
      driver_license,
    });

    await this.ormRepository.save(user);

    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ email });

    return user;
  }

  async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);

    return user;
  }

  async save(user: User): Promise<void> {
    await this.ormRepository.save(user);
  }
}

export { UsersRepository };
