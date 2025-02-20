import { Task } from '@/domain/enterprise/entities/task';
import { User } from '@/domain/enterprise/entities/user';
import { FindAllTasksUseCase } from './find-all';
import { InMemoryUserRepository } from '@test/repositories/in-memory-users-repository';

describe('FindAllTasksUseCase', () => {
  let userRepository: InMemoryUserRepository;
  let findAllTasksUseCase: FindAllTasksUseCase;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    findAllTasksUseCase = new FindAllTasksUseCase(userRepository);
  });

  it('should find all tasks for a user', async () => {
    const user = new User('1', 'Task Owner', 'owner@example.com');
    user.addTask('Task 1');
    user.addTask('Task 2');
    await userRepository.create(user);

    const tasks = await findAllTasksUseCase.execute(user.id);
    expect(tasks.length).toBe(2);
  });
});
