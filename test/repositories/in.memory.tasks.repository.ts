import { TaskRepository } from '@/domain/application/repositories/task.repository';
import { Task } from '@/domain/enterprise/entities/task';

export class InMemoryTaskRepository implements TaskRepository {
  private tasks: Task[] = [];

  async create(task: Task): Promise<void> {
    this.tasks.push(task);
  }

  async findAll(): Promise<Task[]> {
    return this.tasks;
  }

  async delete(id: string): Promise<void> {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);
    if (taskIndex !== -1) {
      this.tasks.splice(taskIndex, 1);
    }
  }
}
