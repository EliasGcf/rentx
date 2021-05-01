import { env } from '@shared/env';

const sentryConfig = {
  dsn_url: env.SENTRY_DSN_URL,
};

export { sentryConfig };
