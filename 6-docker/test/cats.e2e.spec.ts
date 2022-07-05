import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import * as request from 'supertest';
import { AuthModule } from '../src/auth/auth.module';
import { UsersModule } from '../src/users/users.module';
import { CatsModule } from '../src/cats/cats.module';

describe('CatsController (e2e)', () => {
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
        CatsModule,
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
  });

  let tokenUser1;
  let tokenUser2;
  const users = [];
  const cats = [];

  describe('/cats POST', () => {
    const url = '/cats';
    const payloadCat = {
      name: 'Qoravoy',
      breed: 'Bombat Cat',
    };
    const payloadUser1 = {
      firstName: 'Umar',
      lastName: 'Abdulazizov',
      email: 'umar@gmail.com',
      password: '12345',
    };

    it('should fail if unauthorized', () => {
      return request(app.getHttpServer())
        .post(url)
        .send(payloadCat)
        .expect(401);
    });

    it('should fail if "name" not sent', async () => {
      await request(app.getHttpServer())
        .post('/users')
        .send(payloadUser1)
        .expect(201)
        .then((res) => {
          users.push(res.body);
        });

      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: payloadUser1.email,
          password: payloadUser1.password,
        })
        .expect(200);

      tokenUser1 = response.body.accessToken;

      return request(app.getHttpServer())
        .post(url)
        .set('Authorization', `Bearer ${tokenUser1}`)
        .send({ breed: payloadCat.breed })
        .expect(400);
    });

    it('should fail if "breed" not sent', () => {
      return request(app.getHttpServer())
        .post(url)
        .set('Authorization', `Bearer ${tokenUser1}`)
        .send({ name: payloadCat.name })
        .expect(400);
    });

    it('should create a new cat', () => {
      return request(app.getHttpServer())
        .post(url)
        .set('Authorization', `Bearer ${tokenUser1}`)
        .send(payloadCat)
        .expect(201)
        .then((res) => {
          expect(res.body).toMatchObject(payloadCat);
          expect(res.body).toHaveProperty('userId');
          expect(res.body.userId).toBe(users[0].userId);
          cats.push(res.body);
        });
    });
  });

  describe('/cats/:id GET', () => {
    const baseUrl = '/cats';

    it('should fail if unauthorized', () => {
      return request(app.getHttpServer())
        .get(`${baseUrl}/${cats[0].catId}`)
        .expect(401);
    });

    it('should fail if "id" in param is not number string', () => {
      return request(app.getHttpServer())
        .get('/cats/invalid')
        .set('Authorization', `Bearer ${tokenUser1}`)
        .expect(400);
    });

    it('should return one cat', () => {
      return request(app.getHttpServer())
        .get(`${baseUrl}/${cats[0].catId}`)
        .set('Authorization', `Bearer ${tokenUser1}`)
        .expect(200)
        .then((res) => {
          expect(res.body.catId).toBe(cats[0].catId);
        });
    });
  });

  describe('/cats GET', () => {
    const url = '/cats';

    it('should fail if unauthorized', () => {
      return request(app.getHttpServer()).get(url).expect(401);
    });

    it('should return array of cats', () => {
      return request(app.getHttpServer())
        .get(url)
        .set('Authorization', `Bearer ${tokenUser1}`)
        .expect(200)
        .then((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body[0].catId).toBe(cats[0].catId);
        });
    });
  });

  describe('/cats/:id PUT', () => {
    const baseUrl = '/cats';

    it('should fail if unauthorized', () => {
      return request(app.getHttpServer())
        .put(`${baseUrl}/${cats[0].catId}`)
        .send({})
        .expect(401);
    });

    it('should update one cat', async () => {
      const update = { name: 'Mri' };
      await request(app.getHttpServer())
        .put(`${baseUrl}/${cats[0].catId}`)
        .set('Authorization', `Bearer ${tokenUser1}`)
        .send(update)
        .expect(200);

      return request(app.getHttpServer())
        .get(`${baseUrl}/${cats[0].catId}`)
        .set('Authorization', `Bearer ${tokenUser1}`)
        .expect(200)
        .then((res) => {
          expect(res.body.catId).toBe(cats[0].catId);
          expect(res.body.userId).toBe(cats[0].userId);
          expect(res.body.name).toBe(update.name);
        });
    });

    it('should fail to update one cat (another user)', async () => {
      const payloadUser2 = {
        firstName: 'Abdukarim',
        lastName: 'Mirzayev',
        email: 'hizr@mail.com',
        password: '12345',
      };
      const update = { name: 'Malla' };

      await request(app.getHttpServer())
        .post('/users')
        .send(payloadUser2)
        .expect(201)
        .then((res) => {
          users.push(res.body);
        });

      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: payloadUser2.email, password: payloadUser2.password })
        .expect(200);

      tokenUser2 = response.body.accessToken;

      await request(app.getHttpServer())
        .put(`${baseUrl}/${cats[0].catId}`)
        .set('Authorization', `Bearer ${tokenUser2}`)
        .send(update)
        .expect(200)
        .then((res) => {
          expect(res.body[0]).toBe(0);
        });

      return request(app.getHttpServer())
        .get(`${baseUrl}/${cats[0].catId}`)
        .set('Authorization', `Bearer ${tokenUser2}`)
        .expect(200)
        .then((res) => {
          expect(res.body.catId).toBe(cats[0].catId);
          expect(res.body.name).not.toBe(update.name);
        });
    });
  });

  describe('/cats/:id DELETE', () => {
    const baseUrl = '/cats';
    it('should fail if unauthorized', () => {
      return request(app.getHttpServer())
        .delete(`${baseUrl}/${cats[0].catId}`)
        .expect(401);
    });

    it('should fail when deleting one cat (anothet user)', () => {
      return request(app.getHttpServer())
        .delete(`${baseUrl}/${cats[0].catId}`)
        .set('Authorization', `Bearer ${tokenUser2}`)
        .expect(404);
    });

    it('should delete one cat', async () => {
      await request(app.getHttpServer())
        .delete(`${baseUrl}/${cats[0].catId}`)
        .set('Authorization', `Bearer ${tokenUser1}`)
        .expect(200);

      return request(app.getHttpServer())
        .get(`${baseUrl}`)
        .set('Authorization', `Bearer ${tokenUser1}`)
        .expect(200)
        .then((response) => {
          expect(response.body.length).toBe(0);
        });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
