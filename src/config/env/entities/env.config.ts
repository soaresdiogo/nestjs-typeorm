import { IsString, IsEnum, IsInt, IsDefined } from 'class-validator';

export class EnvConfig {
  @IsDefined()
  @IsEnum(['postgres'])
  DB_TYPE: string = process.env.DB_TYPE || 'postgres';

  @IsDefined()
  @IsString()
  DB_HOST: string = process.env.DB_HOST || 'localhost';

  @IsDefined()
  @IsInt()
  DB_PORT: number = Number.parseInt(process.env.DB_PORT || '5432');

  @IsDefined()
  @IsString()
  DB_USERNAME: string = process.env.DB_USERNAME || 'postgres';

  @IsDefined()
  @IsString()
  DB_PASSWORD: string = process.env.DB_PASSWORD || 'postgres';

  @IsDefined()
  @IsString()
  DB_NAME: string = process.env.DB_NAME || 'todo-list';
}
