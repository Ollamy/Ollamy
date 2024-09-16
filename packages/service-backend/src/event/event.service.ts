import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { EventTriggered, LogEventData } from 'event/event.dto';
import prisma from 'client';

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

  static async getEventWithBadge(eventName: string, badgeName: string) {
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
            trigger: true, // Ensure that 'trigger' is part of your Badge model
            User: {
              select: {
                user_id: true,
              },
              // TODO
              // need to add userID where filter
            },
          },
        },
      },
    });
  }

  static async logEventUpdateBadge(
    eventName: string,
    data: object,
    userId: string,
    logEvent: any,
    event: any,
  ) {
    const dynamicData = {
      [eventName]: logEvent.data[eventName] + data[eventName],
    };

    await prisma.$transaction([
      prisma.logEvent.create({
        data: {
          event_name: eventName,
          user_id: userId,
          data: dynamicData, // Use the dynamic key in the data object
        },
      }),
      prisma.userBadges.create({
        data: {
          user_id: userId,
          badge_id: event.badge[0].id, // Ensure event.badge[0] exists
        },
      }),
    ]);
  }

  static async firstCourseCompleted(
    eventName: string,
    data: object,
    userId: string,
  ) {
    const logEvent = await EventService.getLogEvent(eventName, userId);

    // TODO
    // need to fix this, every event is skip the first time
    if (!logEvent) {
      await prisma.logEvent.create({
        data: {
          event_name: eventName,
          user_id: userId,
          data: data,
        },
      });

      return false;
    }

    const event = await EventService.getEventWithBadge(
      eventName,
      'firstCourseCompleted',
    );

    // TODO
    // Wrong comparator >= need to be <=
    if (
      event.badge[0].trigger['courseCompleted'] >=
        logEvent.data['courseCompleted'] + data['courseCompleted'] &&
      event.badge[0].User.some((user) => user.user_id === userId) === false
    ) {
      await EventService.logEventUpdateBadge(
        eventName,
        data,
        userId,
        logEvent,
        event,
      );
      return true;
    } else {
      const dynamicData = {
        [eventName]: logEvent.data[eventName] + data[eventName],
      };
      await prisma.logEvent.create({
        data: {
          event_name: eventName,
          user_id: userId,
          data: dynamicData,
        },
      });
    }

    return false;
  }

  static async firstQuestionCompleted(
    eventName: string,
    data: object,
    userId: string,
  ) {
    const logEvent = await EventService.getLogEvent(eventName, userId);

    if (!logEvent) {
      await prisma.logEvent.create({
        data: {
          event_name: eventName,
          user_id: userId,
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
      event.badge[0].User.some((user) => user.user_id === userId) === false
    ) {
      await EventService.logEventUpdateBadge(
        eventName,
        data,
        userId,
        logEvent,
        event,
      );
      return true;
    } else {
      const dynamicData = {
        [eventName]: logEvent.data[eventName] + data[eventName],
      };
      await prisma.logEvent.create({
        data: {
          event_name: eventName,
          user_id: userId,
          data: dynamicData,
        },
      });
    }

    return false;
  }

  static async firstQuizzCompleted(
    eventName: string,
    data: object,
    userId: string,
  ) {
    const logEvent = await EventService.getLogEvent(eventName, userId);

    if (!logEvent) {
      await prisma.logEvent.create({
        data: {
          event_name: eventName,
          user_id: userId,
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
      event.badge[0].User.some((user) => user.user_id === userId) === false
    ) {
      await EventService.logEventUpdateBadge(
        eventName,
        data,
        userId,
        logEvent,
        event,
      );
      return true;
    } else {
      const dynamicData = {
        [eventName]: logEvent.data[eventName] + data[eventName],
      };
      await prisma.logEvent.create({
        data: {
          event_name: eventName,
          user_id: userId,
          data: dynamicData,
        },
      });
    }

    return false;
  }

  static async firstWrongAnswer(
    eventName: string,
    data: object,
    userId: string,
  ) {
    const logEvent = await EventService.getLogEvent(eventName, userId);

    if (!logEvent) {
      await prisma.logEvent.create({
        data: {
          event_name: eventName,
          user_id: userId,
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
      event.badge[0].User.some((user) => user.user_id === userId) === false
    ) {
      await EventService.logEventUpdateBadge(
        eventName,
        data,
        userId,
        logEvent,
        event,
      );
      return true;
    } else {
      const dynamicData = {
        [eventName]: logEvent.data[eventName] + data[eventName],
      };
      await prisma.logEvent.create({
        data: {
          event_name: eventName,
          user_id: userId,
          data: dynamicData,
        },
      });
    }

    return false;
  }

  static async firstLessonCompleted(
    eventName: string,
    data: object,
    userId: string,
  ) {
    const logEvent = await EventService.getLogEvent(eventName, userId);

    if (!logEvent) {
      await prisma.logEvent.create({
        data: {
          event_name: eventName,
          user_id: userId,
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
      event.badge[0].User.some((user) => user.user_id === userId) === false
    ) {
      await EventService.logEventUpdateBadge(
        eventName,
        data,
        userId,
        logEvent,
        event,
      );
      return true;
    } else {
      const dynamicData = {
        [eventName]: logEvent.data[eventName] + data[eventName],
      };
      await prisma.logEvent.create({
        data: {
          event_name: eventName,
          user_id: userId,
          data: dynamicData,
        },
      });
    }

    return false;
  }

  static async firstLoginCompleted(
    eventName: string,
    data: object,
    userId: string,
  ) {
    const logEvent = await EventService.getLogEvent(eventName, userId);

    if (!logEvent) {
      await prisma.logEvent.create({
        data: {
          event_name: eventName,
          user_id: userId,
          data: data,
        },
      });

      return false;
    }

    const event = await EventService.getEventWithBadge(
      eventName,
      'firstLoginCompleted',
    );

    if (
      event.badge[0].trigger['loginCompleted'] <=
        logEvent.data['loginCompleted'] + data['loginCompleted'] &&
      event.badge[0].User.some((user) => user.user_id === userId) === false
    ) {
      await EventService.logEventUpdateBadge(
        eventName,
        data,
        userId,
        logEvent,
        event,
      );
      return true;
    } else {
      const dynamicData = {
        [eventName]: logEvent.data[eventName] + data[eventName],
      };
      await prisma.logEvent.create({
        data: {
          event_name: eventName,
          user_id: userId,
          data: dynamicData,
        },
      });
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
    // TODO
    // Need await
    const logEvent = logEvents(eventData.eventName, eventData.data, userId);

    if (logEvent) {
      Logger.debug(
        `Event ${eventData.eventName} unlocked a badge for user ${userId}`,
      );
      return;
    } else {
      await prisma.logEvent.create({
        data: {
          event_name: eventData.eventName,
          user_id: userId,
          data: eventData.data,
        },
      });
    }

    return;
  }
}

// TODO
// Add Record Typing
const EVENTS_TYPES = {
  courseCompleted: EventService.firstCourseCompleted,
  questionCompleted: EventService.firstQuestionCompleted,
  wrongAnswer: EventService.firstWrongAnswer,
  quizzCompleted: EventService.firstQuizzCompleted,
  loginCompleted: EventService.firstLoginCompleted,
};

// TODO
// Fix return type
const logEvents = (eventName: string, data: object, userId: string): string => {
  try {
    return EVENTS_TYPES[eventName](eventName, data, userId);
  } catch (error) {
    Logger.error(error);
    throw new BadRequestException('Error while logging event');
  }
};
