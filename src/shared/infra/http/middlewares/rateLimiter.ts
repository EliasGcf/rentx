import { NextFunction, Request, Response } from 'express';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import redis from 'redis';

import { env } from '@shared/env';
import { AppError } from '@shared/errors';
import { redisConfig } from '@config/redis';

const redisClient = redis.createClient({
  host: redisConfig.host,
  port: redisConfig.port,
});

redisClient.on('connect', () => {
  console.log('Redis connected');
});

const rateLimiterClient = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'rateLimiter',
  points: 10,
  duration: 5,
});

async function rateLimiter(req: Request, res: Response, next: NextFunction) {
  try {
    if (env.isTest) return next();

    await rateLimiterClient.consume(req.ip);

    return next();
  } catch {
    throw new AppError('to_many_requests', 'TOO_MANY_REQUESTS');
  }
}

export { rateLimiter };
