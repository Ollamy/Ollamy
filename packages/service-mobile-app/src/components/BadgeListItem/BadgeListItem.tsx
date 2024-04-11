// @ts-ignore
import LOCK from 'assets/icons/lock.png';
import { Box, HStack, Image, Text, VStack } from 'native-base';
import VerticalProgressBar from 'src/components/VerticalProgressBar/VerticalProgressBar';
import { BadgeStatus } from 'src/pages/badge/types';
import type { BadgeModel } from 'src/services/badge/badge.dto';
import { EnvVar } from 'src/utils/loadEnv';

interface LessonItemProps {
  badge?: BadgeModel;
  index: number;
}

function LessonListItem({ badge, index }: LessonItemProps) {
  const isEvenIdx = !(index % 2);

  return (
    <HStack w="full" justifyContent={isEvenIdx ? 'flex-start' : 'flex-end'}>
      <HStack w="53%" mt="-2px" justifyContent="space-between" reversed={isEvenIdx}>
        <VerticalProgressBar status={badge ? BadgeStatus.UNLOCKED : BadgeStatus.LOCKED} index={index} />
        <VStack
          borderWidth={2}
          borderRadius={8}
          borderColor={badge?.color ?? 'gray.100'}
          paddingTop="4px"
          maxHeight="95px"
          width="70%"
        >
          {badge ? (
            <VStack height="full" alignItems="center" justifyContent="space-between">
              <Image
                style={{ height: '60%', width: '60%' }}
                resizeMode="contain"
                source={{ uri: `${EnvVar.backendUrl}public/badges/${badge.image_name}.png` }}
                alt={`icon-${badge.image_name}`}
              />
              <Text textAlign="center" numberOfLines={2} ellipsizeMode="middle" fontSize="xs" color={badge.color}>
                {badge.description}
              </Text>
            </VStack>
          ) : (
            <VStack height="full" justifyContent="center">
              <Box height="55px" width="55px" alignSelf="center">
                <Image style={{ height: '100%', width: '100%' }} source={LOCK} alt="lock-icon" />
              </Box>
            </VStack>
          )}
        </VStack>
      </HStack>
    </HStack>
  );
}

export default LessonListItem;
