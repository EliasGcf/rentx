import request from 'supertest';
import { Connection } from 'typeorm';
import { runSeeder } from 'typeorm-seeding';

import { server } from '@shared/infra/http/server/Server';

import { createDbConnection } from '@shared/infra/typeorm';
import CreateAdminUserSeed from '@shared/infra/typeorm/seeds/CreateAdminUserSeed';
import { SEED_ADMIN_USER_EMAIL, SEED_ADMIN_USER_PASS } from '@shared/infra/typeorm/utils';

let dbConnection: Connection;
let adminToken: string;

describe('Create Category Controller', () => {
  beforeAll(async () => {
    dbConnection = await createDbConnection();

    await dbConnection.runMigrations();

    await runSeeder(CreateAdminUserSeed);
    const { body } = await request(server.app).post('/sessions').send({
      email: SEED_ADMIN_USER_EMAIL,
      password: SEED_ADMIN_USER_PASS,
    });

    adminToken = body.token;
  });

  afterAll(async () => {
    await dbConnection.dropDatabase();
    await dbConnection.close();
  });

  it('should be able to list all categories', async () => {
    const requests = [
      request(server.app)
        .post('/categories')
        .set({
          Authorization: `Bearer ${adminToken}`,
        })
        .send({
          name: 'fake_name_1',
          description: 'fake_description_1',
        }),
      request(server.app)
        .post('/categories')
        .set({
          Authorization: `Bearer ${adminToken}`,
        })
        .send({
          name: 'fake_name_2',
          description: 'fake_description_2',
        }),
    ];

    await Promise.all(requests);

    const response = await request(server.app).get('/categories');

    expect(response.body.length).toBe(2);
    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[1]).toHaveProperty('id');
  });
});
