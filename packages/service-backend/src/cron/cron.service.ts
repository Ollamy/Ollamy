import { Injectable, Logger } from '@nestjs/common';
import { CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import prisma from '../client';

@Injectable()
export class TasksService {
  constructor(private schedulerRegistry: SchedulerRegistry) {}
  private readonly logger = new Logger(TasksService.name);

  createHpCron(userId: string, courseId: string) {
    const job = new CronJob(CronExpression.EVERY_30_MINUTES, async () => {
      const { hp } = await prisma.usertoCourse.findUnique({
        where: {
          course_id_user_id: {
            course_id: courseId,
            user_id: userId,
          },
        },
        select: {
          hp: true,
        },
      });

      if (hp >= 20) {
        return;
      }

      await prisma.usertoCourse.update({
        where: {
          course_id_user_id: {
            course_id: courseId,
            user_id: userId,
          },
        },
        data: {
          hp: {
            increment: 1,
          },
        },
      });
    });

    this.schedulerRegistry.addCronJob(`hp_${userId}_${courseId}`, job);
    job.start();

    this.logger.log(`${userId}_${courseId} cron registered`);
  }

  getHpCron(userId: string, courseId: string): string {
    const job = this.schedulerRegistry.getCronJob(`hp_${userId}_${courseId}`);

    return job.nextDate().toUTC().toString();
  }
}
