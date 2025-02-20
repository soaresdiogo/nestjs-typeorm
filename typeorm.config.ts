// typeorm.config.ts
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { UserEntity } from './src/infrastructure/database/typeorm/entities/user.entity';
import { TaskEntity } from './src/infrastructure/database/typeorm/entities/task.entity';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.getOrThrow('DB_HOST'),
  port: configService.getOrThrow('DB_PORT'),
  database: configService.getOrThrow('DB_NAME'),
  username: configService.getOrThrow('DB_USERNAME'),
  password: configService.getOrThrow('DB_PASSWORD'),
  migrations: ['migrations/**'],
  entities: [UserEntity, TaskEntity],
});
