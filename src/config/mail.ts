interface IMailConfig {
  driver: 'ethereal' | 'ses';
}

const mailConfig: IMailConfig = {
  driver: process.env.MAIL_DRIVER || 'ethereal',
} as IMailConfig;

export { mailConfig };
