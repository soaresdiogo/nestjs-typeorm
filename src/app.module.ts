import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './infrastructure/database/database.module';
import { EnvModule } from './config/env/env.module';

@Module({
  imports: [EnvModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
