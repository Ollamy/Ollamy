import type { ReactElement } from 'react';

import { EventType } from './type';
import EventBadge from './Unlockbadges';

export type FactoryEventComponentData = { type: EventType; data: object };

export interface FactoryEventComponentInterface {
  data: FactoryEventComponentData;
}

export const eventFactory: Record<EventType, (props: FactoryEventComponentInterface) => ReactElement> = {
  [EventType.BADGE_UNLOCK]: EventBadge,
} as const;
