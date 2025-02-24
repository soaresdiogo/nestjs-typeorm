import { UserRepository } from '@/domain/application/repositories/user.repository';
import { TaskStatus } from '@/domain/enterprise/entities/task.status';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdateTaskStatusUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(
    userId: string,
    taskId: string,
    newStatus: TaskStatus
  ): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const task = user.getTaskById(taskId);
    if (!task) {
      throw new Error('Task not found');
    }

    task.updateStatus(newStatus);
    await this.userRepository.create(user);
  }
}
