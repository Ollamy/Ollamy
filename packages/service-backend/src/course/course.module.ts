import { Module } from '@nestjs/common';
import { CourseController } from 'course/course.controller';
import { CourseService } from 'course/course.service';
import { CronModule } from 'cron/cron.module';
import { TasksService } from 'cron/cron.service';

@Module({
  imports: [CronModule],
  controllers: [CourseController],
  providers: [CourseService, TasksService],
})
export class CourseModule {}
