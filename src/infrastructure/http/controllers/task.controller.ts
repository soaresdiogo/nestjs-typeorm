import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';
import { TaskDto } from './dto/task.dto';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiParam,
} from '@nestjs/swagger';
import { CreateTaskUseCase } from '@/domain/application/use-cases/task/create.task';
import { FindAllTasksUseCase } from '@/domain/application/use-cases/task/find.all';
import { DeleteTaskUseCase } from '@/domain/application/use-cases/task/delete.task';

@ApiTags('Tasks')
@Controller('api/tasks')
export class TaskController {
  constructor(
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly findAllTasksUseCase: FindAllTasksUseCase,
    private readonly deleteTaskUseCase: DeleteTaskUseCase
  ) {}

  @Post(':userId')
  @HttpCode(201)
  @ApiOperation({ summary: 'Create a task' })
  @ApiParam({ name: 'userId', type: 'string', format: 'uuid', required: true })
  @ApiBody({ description: 'Payload to create a new task', type: TaskDto })
  @ApiResponse({
    status: 201,
    description: 'Task created successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request: Invalid input data.',
  })
  async create(@Param('userId') userId: string, @Body() taskDto: TaskDto) {
    const task = await this.createTaskUseCase.execute({
      userId,
      title: taskDto.title,
      description: taskDto.description,
    });
    return {
      message: 'Task created successfully',
      task: {
        id: task.id,
        title: task.title,
        description: task.description,
        status: task.status,
      },
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve all tasks' })
  @ApiResponse({
    status: 200,
    description: 'List of tasks retrieved successfully.',
  })
  async findAll(@Param('id') id: string) {
    return await this.findAllTasksUseCase.execute(id);
  }

  @Delete(':taskId')
  @ApiOperation({ summary: 'Delete a task by ID and User ID' })
  @ApiParam({ name: 'taskId', type: 'string', format: 'uuid', required: true })
  @ApiResponse({
    status: 200,
    description: 'Task deleted successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Task not found.',
  })
  async delete(@Param('taskId') taskId: string) {
    await this.deleteTaskUseCase.execute(taskId);
    return { message: 'Task deleted successfully' };
  }
}
