import { ICreateUserDTO } from '../dtos';
import { User } from '../entities';

interface IUsersRepository {
  create(user: ICreateUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  save(user: User): Promise<void>;
}

export { IUsersRepository };
