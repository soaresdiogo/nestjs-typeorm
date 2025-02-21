import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { TaskDto } from './dto/task.dto';
import { Task } from '@/domain/enterprise/entities/Task';
import { TaskStatus } from '@/domain/enterprise/entities/task.status';
import { v4 as uuidv4 } from 'uuid';
import { TaskRepository } from '@/domain/application/repositories/task.repository';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Tasks')
@Controller('api/tasks')
export class TaskController {
  constructor(private readonly taskRepository: TaskRepository) {}

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
  async create(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body() taskDto: TaskDto
  ) {
    const task = new Task({
      id: uuidv4(),
      title: taskDto.title,
      description: taskDto.description,
      status: taskDto.status || TaskStatus.PENDING,
    });
    await this.taskRepository.create(task, userId);
    return { message: 'Task created successfully' };
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all tasks' })
  @ApiResponse({
    status: 200,
    description: 'List of tasks retrieved successfully.',
  })
  async findAll() {
    return await this.taskRepository.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a task by ID' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid', required: true })
  @ApiResponse({
    status: 200,
    description: 'Task retrieved successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Task not found.',
  })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const task = await this.taskRepository.findById(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task by ID' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid', required: true })
  @ApiResponse({
    status: 200,
    description: 'Task deleted successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Task not found.',
  })
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    await this.taskRepository.delete(id);
    return { message: 'Task deleted successfully' };
  }
}
