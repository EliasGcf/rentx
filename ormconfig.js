module.exports = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: 5432,
  username: 'docker',
  password: 'docker',
  database: 'rentx',
  entities: ['./src/modules/**/entities/*.ts'],
  migrations: ['./src/database/migrations/*.ts'],
  cli: {
    migrationsDir: './src/database/migrations',
  },
};
