import { Task } from '@/domain/enterprise/entities/task';
import { UserRepository } from '../../repositories/user-repository';

export class CreateTaskUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userId: string, title: string): Promise<Task> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const task = user.addTask(title);
    await this.userRepository.save(user);
    return task;
  }
}
