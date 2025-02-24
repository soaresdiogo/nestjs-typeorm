import { AppModule } from '../src/app.module';
import { CreateTaskUseCase } from '../src/domain/application/use-cases/task/create.task';
import { CreateUserUseCase } from '../src/domain/application/use-cases/user/create.user';
import { DatabaseModule } from '../src/infrastructure/database/database.module';
import { TypeOrmService } from '../src/infrastructure/database/typeorm/typeorm.service';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let typeorm: TypeOrmService;
  let createUser: CreateUserUseCase;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [CreateTaskUseCase, CreateUserUseCase, TypeOrmService],
    }).compile();

    app = moduleRef.createNestApplication();

    typeorm = moduleRef.get(TypeOrmService);

    createUser = moduleRef.get(CreateUserUseCase);

    await app.init();
  });

  afterAll(async () => {
    await app.close();
    await typeorm.onModuleDestroy();
  });

  describe('/api/users (POST)', () => {
    it('should create a new user', async () => {
      return await request(app.getHttpServer())
        .post('/api/users')
        .send({
          name: 'Test User',
          email: 'test@example.com',
        })
        .expect(201)
        .expect((res) => {
          expect(res.body.message).toBe('User created successfully');
          expect(res.body.user).toHaveProperty('id');
          expect(res.body.user.name).toBe('Test User');
          expect(res.body.user.email).toBe('test@example.com');
        });
    });
  });

  describe('/api/users/:id (GET)', () => {
    it('should return a specific user by id', async () => {
      const user = await createUser.execute(
        'User to find',
        'user-to-find@example.com'
      );

      return request(app.getHttpServer())
        .get(`/api/users/${user.id}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.id).toBe(user.id);
          expect(res.body.name).toBe(user.name);
          expect(res.body.email).toBe(user.email);
        });
    });
  });

  describe('/api/users (GET)', () => {
    it('should return all users', async () => {
      await createUser.execute('User 1', 'user1@example.com');

      return request(app.getHttpServer())
        .get('/api/users')
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body.length).toBeGreaterThanOrEqual(2);
        });
    });
  });
});
