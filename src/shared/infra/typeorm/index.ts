import { createConnection, getConnectionOptions } from 'typeorm';

import { env } from '@shared/env';

async function createDbConnection(name = 'default') {
  const defaultOptions = await getConnectionOptions();

  const database = env.isTest ? 'rentx_tests' : defaultOptions.database;
  const options = Object.assign(defaultOptions, { name, database });

  const connection = await createConnection(options);

  if (env.isDev) console.log('Database connected');

  return connection;
}

export { createDbConnection };
