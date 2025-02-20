import {
  Body,
  Controller,
  Delete,
  Get,
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

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskRepository: TaskRepository) {}

  @Post(':userId')
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
  async findAll() {
    return await this.taskRepository.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const task = await this.taskRepository.findById(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    await this.taskRepository.delete(id);
    return { message: 'Task deleted successfully' };
  }
}
