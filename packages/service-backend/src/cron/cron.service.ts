import { Injectable, Logger } from '@nestjs/common';
import { CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import prisma from 'client';

@Injectable()
export class TasksService {
  constructor(private schedulerRegistry: SchedulerRegistry) {}
  private readonly logger = new Logger(TasksService.name);

  createHpCron(userId: string, courseId: string) {
    const job = new CronJob(CronExpression.EVERY_30_SECONDS, async () => {
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

      if (hp >= 19) {
        this.schedulerRegistry.deleteCronJob(`hp_${userId}_${courseId}`);
        return;
      }
    });

    if (this.getJobElapsedtime(userId, courseId) !== undefined) return;

    this.schedulerRegistry.addCronJob(`hp_${userId}_${courseId}`, job);
    job.start();

    this.logger.log(`${userId}_${courseId} cron registered`);
  }

  getJobElapsedtime(userId: string, courseId: string): string | undefined {
    let job: CronJob;

    try {
      job = this.schedulerRegistry.getCronJob(`hp_${userId}_${courseId}`);
    } catch (error) {
      return undefined;
    }

    return job.nextDate().toUTC().toString();
  }
}
