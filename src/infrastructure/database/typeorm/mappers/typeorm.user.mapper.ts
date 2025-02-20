import { User } from '@/domain/enterprise/entities/user';
import { TypeORMTaskMapper } from './typeorm.task.mapper';
import { UserEntity } from '../entities/user.entity';

export class TypeORMUserMapper {
  static toDomain(raw: UserEntity): User {
    const user = new User(raw.id, raw.name, raw.email);
    if (raw.tasks) {
      for (const taskEntity of raw.tasks) {
        const task = TypeORMTaskMapper.toDomain(taskEntity);
        user.addTask(task.title);
        const lastTask = user.tasks[user.tasks.length - 1];
        lastTask.updateStatus(task.status);
      }
    }
    return user;
  }

  static toTypeORM(user: User): UserEntity {
    const userEntity = new UserEntity();
    userEntity.id = user.id;
    userEntity.name = user.name;
    userEntity.email = user.email;
    userEntity.tasks = user.tasks.map((task) =>
      TypeORMTaskMapper.toTypeORM(task, user.id)
    );
    return userEntity;
  }
}
