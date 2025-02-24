import { User } from '@/domain/enterprise/entities/user';
import { CreateTaskUseCase } from './create.task';
import { InMemoryUserRepository } from '@test/repositories/in.memory.users.repository';
import { InMemoryTaskRepository } from '@test/repositories/in.memory.tasks.repository';

describe('CreateTaskUseCase', () => {
  let userRepository: InMemoryUserRepository;
  let taskRepository: InMemoryTaskRepository;
  let createTaskUseCase: CreateTaskUseCase;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    taskRepository = new InMemoryTaskRepository();
    createTaskUseCase = new CreateTaskUseCase(userRepository, taskRepository);
  });

  it('should create a task for a user', async () => {
    const user = new User({
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
    });
    await userRepository.create(user);
    const task = await createTaskUseCase.execute({
      userId: user.id,
      title: 'New Task',
      description: 'This is a new task',
    });
    expect(task).toBeDefined();
    expect(task.title).toBe('New Task');
  });
});
