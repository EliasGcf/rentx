import {
  ICreateUserTokenDTO,
  IFindByUserIdAndRefreshTokenDTO,
} from '@modules/accounts/dtos';
import { UserToken } from '@modules/accounts/entities';

import { IUsersTokensRepository } from '../IUsersTokensRepository';

class InMemoryUsersTokensRepository implements IUsersTokensRepository {
  private usersTokens: UserToken[] = [];

  async create(data: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, data);

    this.usersTokens.push(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken({
    user_id,
    refresh_token,
  }: IFindByUserIdAndRefreshTokenDTO): Promise<UserToken | undefined> {
    const userToken = this.usersTokens.find(findUserToken => {
      if (findUserToken.user_id !== user_id) return false;
      if (findUserToken.refresh_token !== refresh_token) return false;

      return true;
    });

    return userToken;
  }

  async deleteById(id: string): Promise<void> {
    const userTokens = this.usersTokens.filter(findUserToken => findUserToken.id !== id);

    this.usersTokens = userTokens;
  }

  async findByRefreshToken(refresh_token: string): Promise<UserToken | undefined> {
    const userToken = this.usersTokens.find(
      findUserToken => findUserToken.refresh_token === refresh_token,
    );

    return userToken;
  }
}

export { InMemoryUsersTokensRepository };
