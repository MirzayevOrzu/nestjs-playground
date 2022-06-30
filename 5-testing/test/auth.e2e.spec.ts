import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import * as request from 'supertest';
import { AuthModule } from '../src/auth/auth.module';
import { UsersModule } from '../src/users/users.module';

describe('AuthController (e2e)', () => {
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
        AuthModule,
        UsersModule,
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
  });

  describe('/auth/login POST', () => {
    const url = '/auth/login';
    const payload = {
      firstName: 'Abdurrohman',
      lastName: 'Aliyev',
      email: 'aliyev@gmail.com',
      password: '12345',
    };

    it('should fail if "password" not sent', () => {
      return request(app.getHttpServer())
        .post(url)
        .send({ email: payload.email })
        .expect(401);
    });

    it('should fail if "email" not sent', () => {
      return request(app.getHttpServer())
        .post(url)
        .send({ password: payload.password })
        .expect(401);
    });

    it('should return access token to user (login user)', async () => {
      await request(app.getHttpServer())
        .post('/users')
        .send(payload)
        .expect(201);

      return request(app.getHttpServer())
        .post(url)
        .send({ email: payload.email, password: payload.password })
        .expect(200)
        .then((res) => {
          expect(res.body).toHaveProperty('accessToken');
          expect(res.body.accessToken.length).toBeGreaterThan(100);
        });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
