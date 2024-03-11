import { Module } from '@nestjs/common';
import { QuestionController } from 'question/question.controller';
import { QuestionService } from 'question/question.service';

@Module({
  imports: [],
  controllers: [QuestionController],
  providers: [QuestionService],
})
export class QuestionModule {}
