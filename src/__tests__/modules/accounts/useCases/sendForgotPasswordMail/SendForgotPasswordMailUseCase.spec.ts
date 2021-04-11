import { AppError } from '@shared/errors';

import { IUsersRepository, IUsersTokensRepository } from '@modules/accounts/repositories';
import { InMemoryMailProvider } from '@shared/container/providers/MailProvider/in-memory';
import {
  InMemoryUsersRepository,
  InMemoryUsersTokensRepository,
} from '@modules/accounts/repositories/in-memory';

import {
  IDateProvider,
  DayjsDateProvider,
  IMailProvider,
} from '@shared/container/providers';

import { SendForgotPasswordMailUseCase } from '@modules/accounts/useCases/sendForgotPasswordMail';

let inMemoryUsersRepository: IUsersRepository;
let inMemoryUsersTokensRepository: IUsersTokensRepository;
let inMemoryMailProvider: IMailProvider;
let dateProvider: IDateProvider;

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;

describe('Send Forgot Mail', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    inMemoryUsersTokensRepository = new InMemoryUsersTokensRepository();
    dateProvider = new DayjsDateProvider();
    inMemoryMailProvider = new InMemoryMailProvider();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      inMemoryUsersRepository,
      inMemoryUsersTokensRepository,
      dateProvider,
      inMemoryMailProvider,
    );
  });

  it('should be able to send forgot password mail to user', async () => {
    const sendMail = spyOn(inMemoryMailProvider, 'sendMail');

    const fake_user_mail = 'fake_email@mail.com';

    inMemoryUsersRepository.create({
      name: 'fake_name',
      email: fake_user_mail,
      password: '123456',
      driver_license: 'fake_license_plate',
    });

    await sendForgotPasswordMailUseCase.execute({ email: fake_user_mail });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to send an email if user does not exists', async () => {
    expect(
      sendForgotPasswordMailUseCase.execute({ email: 'fake_email@mail.com' }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to create an user token', async () => {
    const createTokenOnMail = spyOn(inMemoryUsersTokensRepository, 'create');

    const fake_user_mail = 'fake_email@mail.com';

    inMemoryUsersRepository.create({
      name: 'fake_name',
      email: fake_user_mail,
      password: '123456',
      driver_license: 'fake_license_plate',
    });

    await sendForgotPasswordMailUseCase.execute({ email: fake_user_mail });

    expect(createTokenOnMail).toHaveBeenCalled();
  });
});
