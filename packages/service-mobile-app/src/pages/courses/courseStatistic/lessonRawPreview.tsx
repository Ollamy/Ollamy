import { HStack, Image, Pressable, VStack } from 'native-base';
import { Text } from 'react-native';
import { useNavigate } from 'react-router-native';
import type { GradeStatisticModel } from 'src/services/statistic/statistic.dto';

interface LessonRawPreviewProps {
  lessonStats: GradeStatisticModel,
  onPress: (v: string) => void
}

function LessonRawPreview({ lessonStats, onPress }: LessonRawPreviewProps) {
  const navigate = useNavigate();

  return (
    <Pressable key={lessonStats.lessonId} w={'100%'} onPress={() => onPress(lessonStats.lessonId)}>
      <VStack
        alignItems={'center'}
        w={'full'}
        space={'10px'}
        p={'12px'}
        rounded={'md'}
        borderColor={'gray.200'}
        borderWidth={1}
        >
      <Text style={{ fontWeight: 'bold', fontSize: 16, textTransform: 'capitalize' }}>{lessonStats.title}</Text>
      <VStack alignItems={'center'}>
        <Text style={{ fontWeight: '400', fontSize: 14 }}>Grade Average: {lessonStats.average}</Text>
        <Text style={{ fontWeight: '400', fontSize: 14 }}> Grade Min: {lessonStats.min}</Text>
        <Text style={{ fontWeight: '400', fontSize: 14 }}> Grade Max: {lessonStats.max}</Text>
      </VStack>
      </VStack>
    </Pressable>
  );
}

export default LessonRawPreview;
