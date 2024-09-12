import { Image, Text, View } from 'native-base';
import { EnvVar } from 'src/utils/loadEnv';

import type { FactoryEventComponentData } from '../eventFactory';

interface EventModalProps {
  data: FactoryEventComponentData;
}

function EventBadge({ data }: EventModalProps): JSX.Element {
  // @ts-ignore
  const badgeName = data.data.badge_name;

  return (
    <View>
      <Image
        alignSelf={'center'}
        style={{ height: 100, width: 100 }}
        resizeMode={'contain'}
        source={{ uri: `${EnvVar.backendUrl}public/badges/${badgeName}.png` }}
        alt={`icon-${badgeName}`}
      />
      <Text>A new Badge have been Unlocked !</Text>
    </View>
  );
}

export default EventBadge;
