import { InMemoryUserRepository } from '@test/repositories/in.memory.users.repository';
import { DeleteTaskUseCase } from './delete.task';
import { User } from '@/domain/enterprise/entities/user';
import { InMemoryTaskRepository } from '@test/repositories/in.memory.tasks.repository';

describe('DeleteTaskUseCase', () => {
  let userRepository: InMemoryUserRepository;
  let taskRepository: InMemoryTaskRepository;
  let deleteTaskUseCase: DeleteTaskUseCase;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    taskRepository = new InMemoryTaskRepository();
    deleteTaskUseCase = new DeleteTaskUseCase(taskRepository);
  });

  it('should delete a task from a user', async () => {
    const user = new User({
      name: 'John Doe',
      email: 'john.doe@example.com',
    });
    await userRepository.create(user);

    const task = user.addTask({
      title: 'Task to be deleted',
      description: 'This task will be deleted',
    });
    await taskRepository.create(task);

    const userWithTask = await userRepository.findById(user.id);
    expect(userWithTask?.tasks).toHaveLength(1);
    expect(userWithTask?.tasks[0].title).toBe('Task to be deleted');
    expect(userWithTask?.tasks[0].description).toBe(
      'This task will be deleted'
    );

    await deleteTaskUseCase.execute(task.id);

    const tasks = await taskRepository.findAll();

    expect(tasks).toHaveLength(0);
  });
});
