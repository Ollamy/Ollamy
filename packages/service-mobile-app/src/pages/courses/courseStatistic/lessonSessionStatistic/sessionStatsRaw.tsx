import { Pressable, VStack } from 'native-base';
import { Text } from 'react-native';
import { useNavigate } from 'react-router-native';
import type { SessionGradeStatistic } from 'src/services/statistic/statistic.dto';

function SessionStatsRaw({ SessionStats, idx }: { SessionStats: SessionGradeStatistic; idx: number }) {
  const navigate = useNavigate();
  const isSuccess =
    SessionStats.correctAnswers === 0 ? false : SessionStats.correctAnswers / SessionStats.totalQuestions > 0.7;

  return (
    <Pressable key={idx} w={'100%'} onPress={() => navigate(``)}>
      <VStack
        alignItems={'center'}
        w={'full'}
        space={'10px'}
        p={'12px'}
        rounded={'md'}
        borderColor={'gray.200'}
        borderWidth={1}
      >
        {isSuccess ? (
          <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'green' }}>Success</Text>
        ) : (
          <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'red' }}>Failure</Text>
        )}
        {/* Waiting for the backend data */}
        <Text style={{ fontWeight: 'bold', fontSize: 16, textTransform: 'capitalize' }}>Session Date: 12-08-2024</Text>
        <VStack alignItems={'center'} w={'full'} justifyContent={'space-between'}>
          <Text style={{ fontWeight: '400', fontSize: 14 }}>Correct Answers : {SessionStats.correctAnswers}</Text>
          <Text style={{ fontWeight: '400', fontSize: 14 }}>
            Wrong Answers: {SessionStats.totalQuestions - SessionStats.correctAnswers}
          </Text>
          <Text style={{ fontWeight: '400', fontSize: 14 }}>Session duration: {SessionStats.timeTakenInSeconds}</Text>
        </VStack>
      </VStack>
    </Pressable>
  );
}

export default SessionStatsRaw;
