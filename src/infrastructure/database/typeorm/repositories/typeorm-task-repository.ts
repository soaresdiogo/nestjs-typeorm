import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from '@/domain/application/repositories/task-repository';
import { Task } from '@/domain/enterprise/entities/task';
import { TaskEntity } from '../entities/task-entity';
import { TypeORMTaskMapper } from '../mappers/typeorm-task.mapper';

@Injectable()
export class TypeORMTaskRepository implements TaskRepository {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly repository: Repository<TaskEntity>
  ) {}

  async create(task: Task, userId: string): Promise<void> {
    const taskEntity = TypeORMTaskMapper.toTypeORM(task, userId);
    await this.repository.save(taskEntity);
  }

  async findById(id: string): Promise<Task | null> {
    const taskEntity = await this.repository.findOne({
      where: { id },
    });

    if (!taskEntity) {
      return null;
    }

    return TypeORMTaskMapper.toDomain(taskEntity);
  }

  async findAll(): Promise<Task[]> {
    const taskEntities = await this.repository.find();
    return taskEntities.map((entity) => TypeORMTaskMapper.toDomain(entity));
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
