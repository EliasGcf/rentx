import { ICreateUserTokenDTO, IFindByUserIdAndRefreshTokenDTO } from '../dtos';
import { UserToken } from '../entities';

interface IUsersTokensRepository {
  create(data: ICreateUserTokenDTO): Promise<UserToken>;
  findByUserIdAndRefreshToken(
    data: IFindByUserIdAndRefreshTokenDTO,
  ): Promise<UserToken | undefined>;
  deleteById(id: string): Promise<void>;
  findByRefreshToken(refresh_token: string): Promise<UserToken | undefined>;
}

export { IUsersTokensRepository };
