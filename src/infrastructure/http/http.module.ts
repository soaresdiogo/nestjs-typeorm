import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserController } from './controllers/user.controller';
import { TaskController } from './controllers/task.controller';
import { CreateUserUseCase } from '@/domain/application/use-cases/user/create.user';
import { FindAllTasksUseCase } from '@/domain/application/use-cases/task/find.all';
import { FindUserByIdUseCase } from '@/domain/application/use-cases/user/find.user.by.id';
import { CreateTaskUseCase } from '@/domain/application/use-cases/task/create.task';
import { FindTaskByIdUseCase } from '@/domain/application/use-cases/task/find.task.by.id';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController, TaskController],
  providers: [
    CreateUserUseCase,
    FindAllTasksUseCase,
    FindUserByIdUseCase,
    CreateTaskUseCase,
    FindAllTasksUseCase,
    FindTaskByIdUseCase,
  ],
})
export class HttpModule {}
