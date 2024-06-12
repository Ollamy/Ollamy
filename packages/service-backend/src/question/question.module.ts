import { Module } from '@nestjs/common';
import { QuestionController } from 'question/question.controller';
import { QuestionService } from 'question/question.service';
import { TasksService } from '../cron/cron.service';

@Module({
  imports: [],
  controllers: [QuestionController],
  providers: [QuestionService, TasksService],
})
export class QuestionModule {}
