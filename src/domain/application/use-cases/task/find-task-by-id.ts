import { Task } from '@/domain/enterprise/entities/task';
import { UserRepository } from '../../repositories/user-repository';

export class FindTaskByIdUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userId: string, taskId: string): Promise<Task | null> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    return user.tasks.find((task) => task.id === taskId) || null;
  }
}
