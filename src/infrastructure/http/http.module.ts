import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserController } from './controllers/user.controller';
import { TaskController } from './controllers/task.controller';
import { CreateUserUseCase } from '@/domain/application/use-cases/user/create.user';
import { FindAllTasksUseCase } from '@/domain/application/use-cases/task/find.all';
import { FindUserByIdUseCase } from '@/domain/application/use-cases/user/find.user.by.id';
import { CreateTaskUseCase } from '@/domain/application/use-cases/task/create.task';
import { DeleteTaskUseCase } from '@/domain/application/use-cases/task/delete.task';
import { FindAllUsersUseCase } from '@/domain/application/use-cases/user/find.all';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController, TaskController],
  providers: [
    CreateUserUseCase,
    FindAllUsersUseCase,
    FindUserByIdUseCase,
    CreateTaskUseCase,
    FindAllTasksUseCase,
    DeleteTaskUseCase,
  ],
})
export class HttpModule {}
