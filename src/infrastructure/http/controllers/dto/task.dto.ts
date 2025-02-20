import { TaskStatus } from '@/domain/enterprise/entities/task.status';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class TaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsOptional()
  status?: TaskStatus;
}
