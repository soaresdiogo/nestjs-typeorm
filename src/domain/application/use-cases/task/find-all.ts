import { Task } from '@/domain/enterprise/entities/task';
import { UserRepository } from '../../repositories/user-repository';

export class FindAllTasksUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userId: string): Promise<Task[]> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    return user.tasks;
  }
}
