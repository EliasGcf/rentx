import { inject, injectable } from 'tsyringe';
import path from 'path';
import { v4 as uuidV4 } from 'uuid';

import { env } from '@shared/env';
import { AppError } from '@shared/errors';
import { IBaseUseCase } from '@shared/useCases';
import { IDateProvider, IMailProvider } from '@shared/container/providers';
import { IUsersRepository, IUsersTokensRepository } from '@modules/accounts/repositories';
import { IForgotPasswordEmailHbs } from '@modules/accounts/views/types/IForgotPasswordEmailHbs';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordMailUseCase implements IBaseUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,

    @inject('DateProvider')
    private dateProvider: IDateProvider,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('user_is_not_registered');
    }

    const refresh_token = uuidV4();
    const expires_date = this.dateProvider.addHours(3);

    await this.usersTokensRepository.create({
      user_id: user.id,
      refresh_token,
      expires_date,
    });

    const templatePath = path.resolve(
      __dirname,
      '..',
      '..',
      'views',
      'emails',
      'forgotPasswordEmail.hbs',
    );

    await this.mailProvider.sendMail<IForgotPasswordEmailHbs>({
      to: email,
      subject: 'Recuperação de senha.',
      path: templatePath,
      variables: {
        name: user.name,
        link: `${env.FORGOT_MAIL_URL}${refresh_token}`,
      },
    });
  }
}

export { SendForgotPasswordMailUseCase };
