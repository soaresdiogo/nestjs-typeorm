import { User } from '@/domain/enterprise/entities/user';
import { CreateTaskUseCase } from './create-task';
import { InMemoryUserRepository } from '@test/repositories/in-memory-users-repository';

describe('CreateTaskUseCase', () => {
  let userRepository: InMemoryUserRepository;
  let createTaskUseCase: CreateTaskUseCase;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    createTaskUseCase = new CreateTaskUseCase(userRepository);
  });

  it('should create a task for a user', async () => {
    const user = new User('1', 'Task Owner', 'owner@example.com');
    await userRepository.create(user);
    const task = await createTaskUseCase.execute(user.id, 'New Task');
    expect(task).toBeDefined();
    expect(task.title).toBe('New Task');
  });
});
