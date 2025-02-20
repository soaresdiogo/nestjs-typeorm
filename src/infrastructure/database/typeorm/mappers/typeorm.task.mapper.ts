import { Task } from '@/domain/enterprise/entities/task';
import { TaskEntity } from '../entities/task.entity';

export class TypeORMTaskMapper {
  static toDomain(raw: TaskEntity): Task {
    return new Task({
      id: raw.id,
      title: raw.title,
      description: raw.description,
      status: raw.status,
    });
  }

  static toTypeORM(task: Task, userId: string): TaskEntity {
    const taskEntity = new TaskEntity();
    taskEntity.id = task.id;
    taskEntity.title = task.title;
    taskEntity.description = task.description;
    taskEntity.status = task.status;
    taskEntity.createdAt = task.createdAt;
    taskEntity.user_id = userId;
    return taskEntity;
  }
}
