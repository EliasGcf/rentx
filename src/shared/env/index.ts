import 'dotenv/config';
import { cleanEnv, str } from 'envalid';

const env = cleanEnv(process.env, {
  NODE_ENV: str({
    choices: ['development', 'test', 'production'],
    default: 'development',
  }),
  FORGOT_MAIL_URL: str({ example: 'http://localhost:3333/password/reset?token=' }),
});

export { env };
