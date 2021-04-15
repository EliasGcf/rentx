import { env } from '@shared/env';

interface IMailConfig {
  driver: 'ethereal' | 'ses';
}

const mailConfig = {
  driver: env.MAIL_DRIVER,
} as IMailConfig;

export { mailConfig };
