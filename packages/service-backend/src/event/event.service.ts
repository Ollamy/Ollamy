import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { EventTriggered, LogEventData } from 'event/event.dto';
import prisma from 'client';
import { log } from 'console';

@Injectable()
export class EventService {
  static async getLogEvent(eventName: string, userId: string) {
    return await prisma.logEvent.findFirst({
      where: {
        user_id: userId,
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

  static async getEventWithBadge(
    eventName: string,
    badgeName: string,
    userId?: string,
  ) {
    return await prisma.event.findUnique({
      where: {
        name: eventName,
      },
      include: {
        badge: {
          where: {
            tag: badgeName,
          },
          select: {
            id: true,
            trigger: true,
            User: {
              select: {
                user_id: true,
              },
              where: {
                user_id: userId,
              },
            },
          },
        },
      },
    });
  }

  static async logEventUpdateBadge(userId: string, badgeId: string) {
    if (badgeId && userId) {
      await prisma.userBadges.create({
        data: {
          user_id: userId,
          badge_id: badgeId,
        },
      });
    }
  }

  static async firstCourseCompleted(
    eventName: string,
    data: object,
    userId: string,
  ) {
    let logEvent = await EventService.getLogEvent(eventName, userId);

    const eventData = !logEvent
      ? data
      : {
          [eventName]: logEvent.data[eventName] + data[eventName],
        };

    logEvent = await prisma.logEvent.create({
      data: {
        event_name: eventName,
        user_id: userId,
        data: eventData,
      },
    });

    const event = await EventService.getEventWithBadge(
      eventName,
      'firstCourseCompleted',
      userId,
    );

    if (
      event.badge[0].trigger['courseCompleted'] <=
        logEvent.data['courseCompleted'] &&
      event.badge[0].User.some((user) => user.user_id === userId) === false
    ) {
      await EventService.logEventUpdateBadge(
        userId,
        event.badge[0].id as string,
      );
      return true;
    }

    return false;
  }

  static async firstQuestionCompleted(
    eventName: string,
    data: object,
    userId: string,
  ) {
    let logEvent = await EventService.getLogEvent(eventName, userId);

    const eventData = !logEvent
      ? data
      : {
          [eventName]: logEvent.data[eventName] + data[eventName],
        };

    logEvent = await prisma.logEvent.create({
      data: {
        event_name: eventName,
        user_id: userId,
        data: eventData,
      },
    });

    const event = await EventService.getEventWithBadge(
      eventName,
      'firstQuestionCompleted',
      userId,
    );

    if (
      event.badge[0].trigger['questionCompleted'] >=
        logEvent.data['questionCompleted'] &&
      event.badge[0].User.some((user) => user.user_id === userId) === false
    ) {
      await EventService.logEventUpdateBadge(
        userId,
        event.badge[0].id as string,
      );
      return true;
    }

    return false;
  }

  static async firstQuizzCompleted(
    eventName: string,
    data: object,
    userId: string,
  ) {
    let logEvent = await EventService.getLogEvent(eventName, userId);

    const eventData = !logEvent
      ? data
      : {
          [eventName]: logEvent.data[eventName] + data[eventName],
        };

    logEvent = await prisma.logEvent.create({
      data: {
        event_name: eventName,
        user_id: userId,
        data: eventData,
      },
    });

    const event = await EventService.getEventWithBadge(
      eventName,
      'firstQuizzCompleted',
      userId,
    );

    if (
      event.badge[0].trigger['quizzCompleted'] >=
        logEvent.data['quizzCompleted'] &&
      event.badge[0].User.some((user) => user.user_id === userId) === false
    ) {
      await EventService.logEventUpdateBadge(
        userId,
        event.badge[0].id as string,
      );
      return true;
    }

    return false;
  }

  static async firstWrongAnswer(
    eventName: string,
    data: object,
    userId: string,
  ) {
    let logEvent = await EventService.getLogEvent(eventName, userId);

    const eventData = !logEvent
      ? data
      : {
          [eventName]: logEvent.data[eventName] + data[eventName],
        };

    logEvent = await prisma.logEvent.create({
      data: {
        event_name: eventName,
        user_id: userId,
        data: eventData,
      },
    });

    const event = await EventService.getEventWithBadge(
      eventName,
      'firstWrongAnswer',
      userId,
    );

    if (
      event.badge[0].trigger['wrongAnswer'] >= logEvent.data['wrongAnswer'] &&
      event.badge[0].User.some((user) => user.user_id === userId) === false
    ) {
      await EventService.logEventUpdateBadge(
        userId,
        event.badge[0].id as string,
      );
      return true;
    }

    return false;
  }

  static async firstLessonCompleted(
    eventName: string,
    data: object,
    userId: string,
  ) {
    let logEvent = await EventService.getLogEvent(eventName, userId);

    const eventData = !logEvent
      ? data
      : {
          [eventName]: logEvent.data[eventName] + data[eventName],
        };

    logEvent = await prisma.logEvent.create({
      data: {
        event_name: eventName,
        user_id: userId,
        data: eventData,
      },
    });

    const event = await EventService.getEventWithBadge(
      eventName,
      'firstLessonCompleted',
      userId,
    );

    if (
      event.badge[0].trigger['lessonCompleted'] >=
        logEvent.data['lessonCompleted'] &&
      event.badge[0].User.some((user) => user.user_id === userId) === false
    ) {
      await EventService.logEventUpdateBadge(
        userId,
        event.badge[0].id as string,
      );
      return true;
    }

    return false;
  }

  static async firstLoginCompleted(
    eventName: string,
    data: object,
    userId: string,
  ) {
    let logEvent = await EventService.getLogEvent(eventName, userId);

    const eventData = !logEvent
      ? data
      : {
          [eventName]: logEvent.data[eventName] + data[eventName],
        };

    logEvent = await prisma.logEvent.create({
      data: {
        event_name: eventName,
        user_id: userId,
        data: eventData,
      },
    });

    const event = await EventService.getEventWithBadge(
      eventName,
      'firstLoginCompleted',
      userId,
    );

    if (
      event.badge[0].trigger['loginCompleted'] <=
        logEvent.data['loginCompleted'] &&
      event.badge[0].User.some((user) => user.user_id === userId) === false
    ) {
      await EventService.logEventUpdateBadge(
        userId,
        event.badge[0].id as string,
      );
      return true;
    }

    return false;
  }

  async getTriggeredEvents(
    userId: string,
  ): Promise<EventTriggered | Array<[]>> {
    const lastUserBadge = await prisma.userBadges.findFirst({
      where: {
        user_id: userId,
        seen: false,
      },
      orderBy: {
        created_at: 'desc',
      },
      select: {
        badge: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    });

    if (!lastUserBadge) {
      return [];
    }

    await prisma.userBadges.update({
      where: {
        user_id_badge_id: {
          user_id: userId,
          badge_id: lastUserBadge.badge.id,
        },
      },
      data: {
        seen: true,
      },
    });
    return {
      type: 'BADGE_UNLOCK',
      badge_name: lastUserBadge.badge.name,
    } as EventTriggered;
  }

  static async logEventandTriggerBadge(
    eventData: LogEventData,
    userId: string,
  ): Promise<void> {
    const event = await prisma.event.findUnique({
      where: {
        name: eventData.eventName,
      },
      include: {
        badge: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!event) {
      Logger.warn('Event not found');
      return;
    }
    const logEvent = await logEvents(
      eventData.eventName,
      eventData.data,
      userId,
    );

    if (logEvent) {
      Logger.log(
        `Event ${eventData.eventName} unlocked a badge for user ${userId}`,
      );
    }
  }
}

const EVENTS_TYPES: Record<
  string,
  (eventName: string, data: object, userId: string) => Promise<boolean>
> = {
  courseCompleted: EventService.firstCourseCompleted,
  questionCompleted: EventService.firstQuestionCompleted,
  wrongAnswer: EventService.firstWrongAnswer,
  quizzCompleted: EventService.firstQuizzCompleted,
  loginCompleted: EventService.firstLoginCompleted,
};

const logEvents = async (
  eventName: string,
  data: object,
  userId: string,
): Promise<boolean> => {
  try {
    return await EVENTS_TYPES[eventName](eventName, data, userId);
  } catch (error) {
    Logger.error(error);
    throw new BadRequestException('Error while logging event');
  }
};
