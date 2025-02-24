import { Task } from '@/domain/enterprise/entities/task';
import { User } from '@/domain/enterprise/entities/user';
import { FindAllTasksUseCase } from './find.all';
import { InMemoryUserRepository } from '@test/repositories/in.memory.users.repository';

describe('FindAllTasksUseCase', () => {
  let userRepository: InMemoryUserRepository;
  let findAllTasksUseCase: FindAllTasksUseCase;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    findAllTasksUseCase = new FindAllTasksUseCase(userRepository);
  });

  it('should find all tasks for a user', async () => {
    const user = new User({
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
    });
    user.addTask({ title: 'Task 1', description: 'This is task 1' });
    user.addTask({ title: 'Task 2', description: 'This is task 2' });
    await userRepository.create(user);

    const tasks = await findAllTasksUseCase.execute(user.id);
    expect(tasks.length).toBe(2);
  });
});
