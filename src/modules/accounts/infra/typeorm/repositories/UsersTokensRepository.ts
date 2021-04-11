import { getRepository, Repository } from 'typeorm';

import { UserToken } from '@modules/accounts/entities';
import { IUsersTokensRepository } from '@modules/accounts/repositories';
import {
  ICreateUserTokenDTO,
  IFindByUserIdAndRefreshTokenDTO,
} from '@modules/accounts/dtos';

class UsersTokensRepository implements IUsersTokensRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  async create(data: ICreateUserTokenDTO): Promise<UserToken> {
    const { user_id, expires_date, refresh_token } = data;

    const userToken = this.ormRepository.create({
      user_id,
      expires_date,
      refresh_token,
    });

    await this.ormRepository.save(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken({
    user_id,
    refresh_token,
  }: IFindByUserIdAndRefreshTokenDTO): Promise<UserToken | undefined> {
    const userToken = await this.ormRepository.findOne({ user_id, refresh_token });

    return userToken;
  }

  async deleteById(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  async findByRefreshToken(refresh_token: string): Promise<UserToken | undefined> {
    const userToken = await this.ormRepository.findOne({ refresh_token });

    return userToken;
  }
}

export { UsersTokensRepository };
