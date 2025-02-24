import { InMemoryUserRepository } from '@test/repositories/in.memory.users.repository';
import { User } from '@/domain/enterprise/entities/user';
import { TaskStatus } from '@/domain/enterprise/entities/task.status';
import { UpdateTaskStatusUseCase } from './update.task';

describe('UpdateTaskStatusUseCase', () => {
  let userRepository: InMemoryUserRepository;
  let updateTaskStatusUseCase: UpdateTaskStatusUseCase;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    updateTaskStatusUseCase = new UpdateTaskStatusUseCase(userRepository);
  });

  it('should update the task status', async () => {
    const user = new User({
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
    });
    await userRepository.create(user);

    const task = user.addTask({
      title: 'My Task',
      description: 'This is a task',
    });
    await userRepository.create(user);

    expect(task.status).toBe(TaskStatus.PENDING);

    await updateTaskStatusUseCase.execute(
      user.id,
      task.id,
      TaskStatus.COMPLETED
    );

    const userWithUpdatedTask = await userRepository.findById(user.id);
    const updatedTask = userWithUpdatedTask?.getTaskById(task.id);

    expect(updatedTask?.status).toBe(TaskStatus.COMPLETED);
  });

  it('should throw an error if user is not found', async () => {
    await expect(
      updateTaskStatusUseCase.execute(
        'non-existent-user-id',
        'task-id',
        TaskStatus.COMPLETED
      )
    ).rejects.toThrowError('User not found');
  });

  it('should throw an error if task is not found', async () => {
    const user = new User({
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
    });
    await userRepository.create(user);

    await expect(
      updateTaskStatusUseCase.execute(
        user.id,
        'non-existent-task-id',
        TaskStatus.COMPLETED
      )
    ).rejects.toThrowError('Task not found');
  });

  it('should throw an error if status is invalid', async () => {
    const user = new User({
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
    });
    await userRepository.create(user);

    const task = user.addTask({
      title: 'Another Task',
      description: 'Task to be tested',
    });
    await userRepository.create(user);

    await expect(
      updateTaskStatusUseCase.execute(
        user.id,
        task.id,
        'INVALID_STATUS' as TaskStatus
      )
    ).rejects.toThrowError('Invalid status');
  });
});
