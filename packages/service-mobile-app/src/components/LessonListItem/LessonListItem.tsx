// @ts-ignore
import CompletedIcon from 'assets/completed.png';
// @ts-ignore
import NotStartedIcon from 'assets/lock.png';
// @ts-ignore
import InProgressIcon from 'assets/yellow-right-arrow.png';
import { Box, HStack, Image, Pressable, Text, VStack } from 'native-base';
import type { ImageSourcePropType } from 'react-native';
import VerticalProgressBar, { STATUS_COLORS } from 'src/components/VerticalProgressBar/VerticalProgressBar';
import type { Lesson } from 'src/pages/courses/types';
import { Status } from 'src/pages/courses/types';

interface LessonItemProps {
  lesson: Lesson;
  index: number;
  onPress?: () => void;
  itemName?: string;
}

const STATUS_TO_ICON: Record<Status, ImageSourcePropType> = {
  [Status.NOT_STARTED]: NotStartedIcon,
  [Status.IN_PROGRESS]: InProgressIcon,
  [Status.COMPLETED]: CompletedIcon,
};

function LessonListItem({ lesson, index, onPress, itemName }: LessonItemProps) {
  return (
    <HStack w={'full'} justifyContent={'start'} mt={'-2px'}>
      <VerticalProgressBar status={lesson.status} index={index} />
      <Pressable flex={'1'} py={4} pl={4} h={'full'} disabled={lesson.status === Status.NOT_STARTED} onPress={onPress}>
        <Box borderWidth={2} borderRadius={8} borderColor={STATUS_COLORS[lesson.status]} h={'68px'}>
          <HStack flex={'1'} alignItems={'center'} justifyContent={'space-between'} px={4} space={4}>
            <Image
              source={{
                uri: 'data:image/jpeg;base64,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',
              }}
              alt={'icon'}
              size={10}
              resizeMode={'contain'}
            />
            <VStack space={'4px'} flex={1}>
              <Text fontSize={'sm'} fontWeight={'normal'}>
                {itemName ?? 'Lesson'} {index + 1}
              </Text>
              <Text fontSize={'sm'} color={'gray.900'} fontWeight={'bold'} isTruncated>
                {lesson.title}
              </Text>
            </VStack>
            <Image source={STATUS_TO_ICON[lesson.status]} alt={'icon'} size={5} resizeMode={'contain'} />
          </HStack>
        </Box>
      </Pressable>
    </HStack>
  );
}

export default LessonListItem;
