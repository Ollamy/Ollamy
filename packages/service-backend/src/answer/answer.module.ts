import { Module } from '@nestjs/common';
import { AnswerController } from 'answer/answer.controller';
import { AnswerService } from 'answer/answer.service';

@Module({
  imports: [],
  controllers: [AnswerController],
  providers: [AnswerService],
})
export class AnswerModule {}
