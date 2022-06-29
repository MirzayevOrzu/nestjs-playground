import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import * as request from 'supertest';
import { UsersModule } from '../src/users/users.module';

describe('UsersController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        SequelizeModule.forRoot({
          dialect: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          password: 'postgresql_12',
          database: 'mydb_test',
          autoLoadModels: true,
          synchronize: true,
          logging: false,
        }),
        UsersModule,
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  describe('/users POST', () => {
    const url = '/users';
    const payload = {
      firstName: 'Orzu',
      lastName: 'Mirzayev',
      email: 'orzu@gmail.com',
      password: '12345',
    };

    it('should fail if "firstName" not sent', () => {
      const { firstName, ...failPayload } = payload;
      return request(app.getHttpServer())
        .post(url)
        .send(failPayload)
        .expect(400);
    });

    it('should fail if "lastName" not sent', () => {
      const { lastName, ...failPayload } = payload;
      return request(app.getHttpServer())
        .post(url)
        .send(failPayload)
        .expect(400);
    });

    it('should fail if "email" not sent', () => {
      const { lastName, ...failPayload } = payload;
      return request(app.getHttpServer())
        .post(url)
        .send(failPayload)
        .expect(400);
    });

    it('should fail if "password" not sent', () => {
      const { lastName, ...failPayload } = payload;
      return request(app.getHttpServer())
        .post(url)
        .send(failPayload)
        .expect(400);
    });

    it('should register (create) user', () => {
      return request(app.getHttpServer())
        .post(url)
        .send(payload)
        .expect(201)
        .then((res) => {
          expect(res.body).toMatchObject({
            ...payload,
            password: expect.any(String),
          });
          expect(res.body.password).not.toBe(payload.password);
          expect(res.body.password.length).toBeGreaterThanOrEqual(60);
          expect(res.body).toHaveProperty('userId', expect.any(Number));
        });
    });

    it('should throw error if users exists', () => {
      return request(app.getHttpServer())
        .post(url)
        .send(payload)
        .expect(400)
        .then((res) => {
          expect(res.body.message).toMatch('');
          expect(res.body.statusCode).toBe(400);
        });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
