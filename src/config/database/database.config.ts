import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { EnvConfig } from '../env/entities/EnvConfig';
import { UserEntity } from '@/infrastructure/database/typeorm/entities/user-entity';
import { TaskEntity } from '@/infrastructure/database/typeorm/entities/task-entity';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService<EnvConfig>) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const dbType = this.configService.get<'postgres'>('DB_TYPE', {
      infer: true,
    });
    const dbHost = this.configService.get<string>('DB_HOST', { infer: true });
    const dbPort = this.configService.get<number>('DB_PORT', { infer: true });
    const dbUsername = this.configService.get<string>('DB_USERNAME', {
      infer: true,
    });
    const dbPassword = this.configService.get<string>('DB_PASSWORD', {
      infer: true,
    });
    const dbName = this.configService.get<string>('DB_NAME', { infer: true });

    if (
      !dbType ||
      !dbHost ||
      !dbPort ||
      !dbUsername ||
      !dbPassword ||
      !dbName
    ) {
      throw new Error('Missing database configuration');
    }

    return {
      type: dbType as 'postgres',
      host: dbHost,
      port: dbPort,
      username: dbUsername,
      password: dbPassword,
      database: dbName,
      entities: [UserEntity, TaskEntity],
      synchronize: process.env.NODE_ENV !== 'production',
      logging: process.env.NODE_ENV !== 'production',
    };
  }
}
