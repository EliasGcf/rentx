import { AppError } from '@shared/errors';

import {
  InMemoryUsersRepository,
  InMemoryUsersTokensRepository,
} from '@modules/accounts/repositories/in-memory';
import { IUsersRepository, IUsersTokensRepository } from '@modules/accounts/repositories';

import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { CreateUserUseCase } from '@modules/accounts/useCases/createUser';
import { DayjsDateProvider, IDateProvider } from '@shared/container/providers';
import { AuthenticateUserUseCase } from '@modules/accounts/useCases/authenticateUser';

let inMemoryUsersRepository: IUsersRepository;
let inMemoryUsersTokensRepository: IUsersTokensRepository;
let dateProvider: IDateProvider;

let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUserCase: CreateUserUseCase;

describe('Authenticate User', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    inMemoryUsersTokensRepository = new InMemoryUsersTokensRepository();
    dateProvider = new DayjsDateProvider();

    createUserUserCase = new CreateUserUseCase(inMemoryUsersRepository);
    authenticateUserUseCase = new AuthenticateUserUseCase(
      inMemoryUsersRepository,
      inMemoryUsersTokensRepository,
      dateProvider,
    );
  });

  it('should be able to authenticate an user', async () => {
    const user: ICreateUserDTO = {
      driver_license: '000123',
      email: 'johndoe@example.com',
      name: 'John Doe',
      password: '123456',
    };

    await createUserUserCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty('token');
  });

  it('should not be able to authenticate a non-existent user', () => {
    expect(
      authenticateUserUseCase.execute({
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with an invalid password', async () => {
    const user: ICreateUserDTO = {
      driver_license: '000123',
      email: 'johndoe@example.com',
      name: 'John Doe',
      password: '123456',
    };

    await createUserUserCase.execute(user);

    expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
