import { AppModule } from '../src/app.module';
import { CreateTaskUseCase } from '../src/domain/application/use-cases/task/create.task';
import { CreateUserUseCase } from '../src/domain/application/use-cases/user/create.user';
import { DatabaseModule } from '../src/infrastructure/database/database.module';
import { TypeOrmService } from '../src/infrastructure/database/typeorm/typeorm.service';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';

describe('TaskController (e2e)', () => {
  let app: INestApplication;
  let typeorm: TypeOrmService;
  let createTask: CreateTaskUseCase;
  let createUser: CreateUserUseCase;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [CreateTaskUseCase, CreateUserUseCase, TypeOrmService],
    }).compile();

    app = moduleRef.createNestApplication();

    typeorm = moduleRef.get(TypeOrmService);

    createTask = moduleRef.get(CreateTaskUseCase);
    createUser = moduleRef.get(CreateUserUseCase);

    await app.init();
  });

  afterAll(async () => {
    await app.close();
    await typeorm.onModuleDestroy();
  });

  describe('/api/tasks/:userId (POST)', () => {
    it('should create a new task', async () => {
      const user = await createUser.execute('User 1', 'user1@example.com');
      return request(app.getHttpServer())
        .post(`/api/tasks/${user.id}`)
        .send({
          title: 'Write a blog post',
          description: 'Write a blog post about NestJS',
          status: 'PENDING',
        })
        .expect(201)
        .expect((res) => {
          expect(res.body.message).toBe('Task created successfully');
          expect(res.body.task.title).toBe('Write a blog post');
          expect(res.body.task.description).toBe(
            'Write a blog post about NestJS'
          );
          expect(res.body.task.status).toBe('PENDING');
        });
    });
  });

  describe('/api/tasks (GET)', () => {
    it('should return all tasks', async () => {
      const user = await createUser.execute('User 2', 'user2@example.com');
      await createTask.execute({
        userId: user.id,
        title: 'Task 1',
        description: 'Task 1 description',
      });
      await createTask.execute({
        userId: user.id,
        title: 'Task 2',
        description: 'Task 2 description',
      });
      await createTask.execute({
        userId: user.id,
        title: 'Task 3',
        description: 'Task 3 description',
      });

      return request(app.getHttpServer())
        .get(`/api/tasks/${user.id}`)
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body.length).toBeGreaterThanOrEqual(3);
        });
    });
  });

  describe('/api/tasks/:taskId (DELETE)', () => {
    it('should delete a task by id', async () => {
      const user = await createUser.execute('User 3', 'user3@example.com');
      const task = await createTask.execute({
        userId: user.id,
        title: 'Task to delete',
        description: 'Task to delete description',
      });

      return request(app.getHttpServer())
        .delete(`/api/tasks/${task.id}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.message).toBe('Task deleted successfully');
        });
    });
  });
});
