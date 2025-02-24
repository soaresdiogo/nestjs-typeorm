import { Injectable } from '@nestjs/common';
import { TaskRepository } from '../../repositories/task.repository';

@Injectable()
export class DeleteTaskUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(taskId: string): Promise<void> {
    await this.taskRepository.delete(taskId);
  }
}
