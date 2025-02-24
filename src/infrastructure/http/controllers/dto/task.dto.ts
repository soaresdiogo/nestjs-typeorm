import { TaskStatus } from '@/domain/enterprise/entities/task.status';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class TaskDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Title of task', example: 'Write a blog post' })
  title: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Description of task',
    example: 'Write a blog post about NestJS',
  })
  description: string;
}
