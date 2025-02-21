import { Task } from '@/domain/enterprise/entities/task';
import { User } from '@/domain/enterprise/entities/user';
import { FindTaskByIdUseCase } from './find.task.by.id';
import { InMemoryUserRepository } from '../../../../../test/repositories/in.memory.users.repository';

describe('FindTaskByIdUseCase', () => {
  let userRepository: InMemoryUserRepository;
  let findTaskByIdUseCase: FindTaskByIdUseCase;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    findTaskByIdUseCase = new FindTaskByIdUseCase(userRepository);
  });

  it('should find a task by ID', async () => {
    const user = new User({
      id: '1',
      name: 'John Dow',
      email: 'john.doe@email.com',
    });
    const task = user.addTask('Task to Find');
    await userRepository.create(user);

    const foundTask = await findTaskByIdUseCase.execute(user.id, task.id);

    expect(foundTask).toEqual(task);
  });
});
