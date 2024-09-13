import {
  Injectable,
  Logger,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import {
  EventNotTriggered,
  EventTriggered,
  LogEventData,
} from 'event/event.dto';
import prisma from 'client';

@Injectable()
export class EventService {
  static async getLogEvent(eventName: string, ctx: any) {
    return await prisma.logEvent.findFirst({
      where: {
        user_id: ctx.__user.id,
        event_name: eventName,
      },
      select: {
        data: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  static async getEventWithBadge(eventName: string, badgeName: string) {
    return await prisma.event.findUnique({
      where: {
        name: eventName,
      },
      include: {
        badge: {
          select: {
            id: true,
            trigger: true,
          },
          where: {
            name: badgeName,
          },
          include: {
            User: {
              select: {
                user_id: true,
              },
            },
          },
        },
      },
    });
  }

  static async logEventUpdateBadge(
    eventName: string,
    data: object,
    ctx: any,
    logEvent: any,
    event: any,
  ) {
    await prisma.$transaction([
      prisma.logEvent.create({
        data: {
          event_name: eventName,
          user_id: ctx.__user.id,
          data: {
            firstCourseCompleted: logEvent.data[eventName] + data[eventName],
          },
        },
      }),
      prisma.userBadges.create({
        data: {
          user_id: ctx.__user.id,
          badge_id: event.badge[0].id,
        },
      }),
    ]);
  }

  static async firstCourseCompleted(eventName: string, data: object, ctx: any) {
    const logEvent = await EventService.getLogEvent(eventName, ctx);

    if (!logEvent) {
      await prisma.logEvent.create({
        data: {
          event_name: eventName,
          user_id: ctx.__user.id,
          data: data,
        },
      });

      return false;
    }

    const event = await EventService.getEventWithBadge(
      eventName,
      'firstCourseCompleted',
    );

    if (
      event.badge[0].trigger['courseCompleted'] >=
        logEvent.data['courseCompleted'] + data['courseCompleted'] &&
      event.badge[0].User.includes(ctx.__user.id) === false
    ) {
      await EventService.logEventUpdateBadge(
        eventName,
        data,
        ctx,
        logEvent,
        event,
      );
      return true;
    }

    return false;
  }

  static async firstQuestionCompleted(
    eventName: string,
    data: object,
    ctx: any,
  ) {
    const logEvent = await EventService.getLogEvent(eventName, ctx);

    if (!logEvent) {
      await prisma.logEvent.create({
        data: {
          event_name: eventName,
          user_id: ctx.__user.id,
          data: data,
        },
      });

      return false;
    }

    const event = await EventService.getEventWithBadge(
      eventName,
      'firstQuestionCompleted',
    );

    if (
      event.badge[0].trigger['questionCompleted'] >=
        logEvent.data['questionCompleted'] + data['questionCompleted'] &&
      event.badge[0].User.includes(ctx.__user.id) === false
    ) {
      await EventService.logEventUpdateBadge(
        eventName,
        data,
        ctx,
        logEvent,
        event,
      );
      return true;
    }

    return false;
  }

  static async firstQuizzCompleted(eventName: string, data: object, ctx: any) {
    const logEvent = await EventService.getLogEvent(eventName, ctx);

    if (!logEvent) {
      await prisma.logEvent.create({
        data: {
          event_name: eventName,
          user_id: ctx.__user.id,
          data: data,
        },
      });

      return false;
    }

    const event = await EventService.getEventWithBadge(
      eventName,
      'firstQuizzCompleted',
    );

    if (
      event.badge[0].trigger['quizzCompleted'] >=
        logEvent.data['quizzCompleted'] + data['quizzCompleted'] &&
      event.badge[0].User.includes(ctx.__user.id) === false
    ) {
      await EventService.logEventUpdateBadge(
        eventName,
        data,
        ctx,
        logEvent,
        event,
      );
      return true;
    }

    return false;
  }

  static async firstWrongAnswer(eventName: string, data: object, ctx: any) {
    const logEvent = await EventService.getLogEvent(eventName, ctx);

    if (!logEvent) {
      await prisma.logEvent.create({
        data: {
          event_name: eventName,
          user_id: ctx.__user.id,
          data: data,
        },
      });

      return false;
    }

    const event = await EventService.getEventWithBadge(
      eventName,
      'firstWrongAnswer',
    );

    if (
      event.badge[0].trigger['wrongAnswer'] >=
        logEvent.data['wrongAnswer'] + data['wrongAnswer'] &&
      event.badge[0].User.includes(ctx.__user.id) === false
    ) {
      await EventService.logEventUpdateBadge(
        eventName,
        data,
        ctx,
        logEvent,
        event,
      );
      return true;
    }

    return false;
  }

  static async firstLessonCompleted(eventName: string, data: object, ctx: any) {
    const logEvent = await EventService.getLogEvent(eventName, ctx);

    if (!logEvent) {
      await prisma.logEvent.create({
        data: {
          event_name: eventName,
          user_id: ctx.__user.id,
          data: data,
        },
      });

      return false;
    }

    const event = await EventService.getEventWithBadge(
      eventName,
      'firstLessonCompleted',
    );

    if (
      event.badge[0].trigger['lessonCompleted'] >=
        logEvent.data['lessonCompleted'] + data['lessonCompleted'] &&
      event.badge[0].User.includes(ctx.__user.id) === false
    ) {
      await EventService.logEventUpdateBadge(
        eventName,
        data,
        ctx,
        logEvent,
        event,
      );
      return true;
    }

    return false;
  }

  async logEventandTriggerBadge(
    eventData: LogEventData,
    ctx: any,
  ): Promise<EventTriggered | EventNotTriggered> {
    const event = await prisma.event.findUnique({
      where: {
        name: eventData.eventName,
      },
      include: {
        badge: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!event) {
      return {
        eventName: eventData.eventName,
        logged: false,
      } as EventNotTriggered;
    }
    const logEvent = logEvents(eventData.eventName, eventData.data, ctx);

    if (logEvent) {
      return {
        type: 'badge',
        id: event.badge[0].id,
      } as EventTriggered;
    } else {
      await prisma.logEvent.create({
        data: {
          event_name: eventData.eventName,
          user_id: ctx.__user.id,
          data: eventData.data,
        },
      });
    }

    return {
      eventName: eventData.eventName,
      logged: true,
    };
  }
}

const EVENTS_TYPES = {
  courseCompleted: EventService.firstCourseCompleted,
  questionCompleted: EventService.firstQuestionCompleted,
  wrongAnswer: EventService.firstWrongAnswer,
  quizzCompleted: EventService.firstQuizzCompleted,
  lessonCompleted: EventService.firstLessonCompleted,
};

const logEvents = (eventName: string, data: object, ctx: any): string => {
  return EVENTS_TYPES[eventName](eventName, data, ctx);
};
