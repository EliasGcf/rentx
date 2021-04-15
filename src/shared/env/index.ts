import 'dotenv/config';
import * as enValid from 'envalid';

const env = enValid.cleanEnv(process.env, {
  NODE_ENV: enValid.str({
    choices: ['development', 'test', 'production'],
    default: 'development',
  }),
  APP_API_URL: enValid.url({
    example: 'http://localhost:3333',
    devDefault: 'http://localhost:3333',
  }),
  FORGOT_MAIL_URL: enValid.url({
    example: 'http://localhost:3333/password/reset?token=',
    devDefault: 'http://localhost:3333/password/reset?token=',
  }),
  MAIL_DRIVER: enValid.str({
    choices: ['ethereal', 'ses'],
    devDefault: 'ethereal',
  }),
  AWS_SES_REGION: enValid.str({
    default: process.env.MAIL_DRIVER === 'ethereal' ? '' : undefined,
  }),
  STORAGE_DRIVER: enValid.str({
    choices: ['disk', 's3'],
    devDefault: 'disk',
  }),
  AWS_ACCESS_KEY_ID: enValid.str({
    default: process.env.STORAGE_DRIVER === 'disk' ? '' : undefined,
  }),
  AWS_SECRET_ACCESS_KEY: enValid.str({
    default: process.env.STORAGE_DRIVER === 'disk' ? '' : undefined,
  }),
  AWS_BUCKET: enValid.str({
    default: process.env.STORAGE_DRIVER === 'disk' ? '' : undefined,
  }),
  AWS_BUCKET_REGION: enValid.str({
    default: process.env.STORAGE_DRIVER === 'disk' ? '' : undefined,
  }),
  AWS_BUCKET_URL: enValid.str({
    default: process.env.STORAGE_DRIVER === 'disk' ? '' : undefined,
  }),
});

export { env };
