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

  it('should be able to create a new category', async () => {
    const response = await request(server.app)
      .post('/categories')
      .set({
        Authorization: `Bearer ${adminToken}`,
      })
      .send({
        name: 'fake_name',
        description: 'fake_description',
      });

    expect(response.status).toBe(201);
  });

  it('should not be able to create a new category with duplicated name', async () => {
    const response = await request(server.app)
      .post('/categories')
      .set({
        Authorization: `Bearer ${adminToken}`,
      })
      .send({
        name: 'fake_name',
        description: 'fake_description',
      });

    expect(response.status).toBe(400);
  });
});
