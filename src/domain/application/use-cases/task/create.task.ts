import { Task } from '@/domain/enterprise/entities/task';
import { UserRepository } from '../../repositories/user.repository';
import { Injectable } from '@nestjs/common';
import { TaskRepository } from '../../repositories/task.repository';

interface CreateTaskProps {
  userId: string;
  title: string;
  description: string;
}
@Injectable()
export class CreateTaskUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly taskRepository: TaskRepository
  ) {}

  async execute({
    userId,
    title,
    description,
  }: CreateTaskProps): Promise<Task> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const task = user.addTask({ title, description });
    await this.taskRepository.create(task, user.id);
    return task;
  }
}
