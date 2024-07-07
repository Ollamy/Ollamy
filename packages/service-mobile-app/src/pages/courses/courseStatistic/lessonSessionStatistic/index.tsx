import { View, ScrollView, VStack } from 'native-base';
import React from 'react';

import type { GradeStatisticModel } from 'src/services/statistic/statistic.dto';
import SessionStatsRaw from './sessionStatsRaw';

function LessonStatistic({ lessonStats }: { lessonStats: GradeStatisticModel }) {
  return (
    <View>
      <ScrollView>
        <VStack w={'100%'} flex={'1'} space={'4'}>
          {lessonStats.sessions.map(
            (lessonStats, idx) => <SessionStatsRaw SessionStats={lessonStats} idx={idx}/>
          )}
        </VStack>
      </ScrollView>
    </View>
  );
}

export default LessonStatistic;