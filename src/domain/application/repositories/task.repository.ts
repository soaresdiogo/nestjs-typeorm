import { Task } from '@/domain/enterprise/entities/task';

export abstract class TaskRepository {
  abstract create(task: Task, id: string): Promise<void>;
  abstract findAll(): Promise<Task[]>;
  abstract delete(id: string): Promise<void>;
}
