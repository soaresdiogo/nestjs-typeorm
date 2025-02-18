import { Task } from '@/domain/enterprise/entities/task';
import { User } from '@/domain/enterprise/entities/user';
import { FindTaskByIdUseCase } from './find-task-by-id';
import { InMemoryUserRepository } from '../../../../../test/repositories/in-memory-users-repository';

describe('FindTaskByIdUseCase', () => {
  let userRepository: InMemoryUserRepository;
  let findTaskByIdUseCase: FindTaskByIdUseCase;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    findTaskByIdUseCase = new FindTaskByIdUseCase(userRepository);
  });

  it('should find a task by ID', async () => {
    const user = new User('1', 'Task Owner', 'owner@example.com');
    const task = user.addTask('Task to Find');
    await userRepository.save(user);

    const foundTask = await findTaskByIdUseCase.execute(user.id, task.id);

    expect(foundTask).toEqual(task);
  });
});
