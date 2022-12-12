import { Module } from '@nestjs/common';
import { ChapterController } from 'chapter/chapter.controller';
import { ChapterService } from 'chapter/chapter.service';

@Module({
  imports: [],
  controllers: [ChapterController],
  providers: [ChapterService],
})
export class ChapterModule {}