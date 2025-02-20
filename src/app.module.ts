import { Module } from '@nestjs/common';
import { DatabaseModule } from './infrastructure/database/database.module';
import { EnvModule } from './config/env/env.module';
import { HttpModule } from './infrastructure/http/http.module';

@Module({
  imports: [EnvModule, DatabaseModule, HttpModule],
})
export class AppModule {}
