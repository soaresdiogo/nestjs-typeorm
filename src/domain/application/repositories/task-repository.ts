import { Task } from '@/domain/enterprise/entities/task';

export abstract class TaskRepository {
  abstract save(task: Task): Promise<void>;
  abstract findById(id: string): Promise<Task | null>;
  abstract findAll(): Promise<Task[]>;
  abstract delete(id: string): Promise<void>;
}
