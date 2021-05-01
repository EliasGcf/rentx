import { env } from '@shared/env';

const redisConfig = {
  host: env.REDIS_HOST,
  port: env.REDIS_PORT,
  pass: env.REDIS_PASS,
};

export { redisConfig };
