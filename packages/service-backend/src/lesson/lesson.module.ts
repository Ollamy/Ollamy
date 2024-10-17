import { Module } from '@nestjs/common';
import { LessonController } from 'lesson/lesson.controller';
import { LessonService } from 'lesson/lesson.service';

@Module({
  imports: [],
  controllers: [LessonController],
  providers: [LessonService],
})
export class LessonModule {}
