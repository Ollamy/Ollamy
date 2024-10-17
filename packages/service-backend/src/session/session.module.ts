import { Module } from '@nestjs/common';
import { TasksService } from 'cron/cron.service';
import { SessionController } from './session.controller';
import { SessionService } from './session.service';

@Module({
  controllers: [SessionController],
  providers: [SessionService, TasksService],
})
export class SessionModule {}
