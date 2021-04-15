import { classToClass } from 'class-transformer';
import { User } from '../entities';
import { IUserMapToDTOResponseDTO } from '../dtos';

class UserMap {
  static toDTO(user: User): IUserMapToDTOResponseDTO {
    return classToClass({
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      driver_license: user.driver_license,
      avatar_url: (user.getAvatarUrl as unknown) as string,
    });
  }
}

export { UserMap };
