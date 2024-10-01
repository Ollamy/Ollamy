import { Text, View } from 'native-base';
import React, { useEffect, useMemo, useState } from 'react';
import TimerBar from 'src/components/TimerBar/TimerBar';
import { QuestionDifficulty } from 'src/services/question/question.dto';

interface QuestionTimerProps {
  time: number;
  difficulty?: QuestionDifficulty;
  answer: string | undefined;
  setTimeUp: (v: boolean) => void;
  questionId: string;
}

const difficultySettings = {
  [QuestionDifficulty.BEGINNER]: { padding: 330, width: 90 },
  [QuestionDifficulty.INTERMEDIATE]: { padding: 290, width: 80 },
  [QuestionDifficulty.ADVANCED]: { padding: 270, width: 75 },
  [QuestionDifficulty.MASTER]: { padding: 230, width: 65 },
};

function QuestionTimer({
  time,
  difficulty = QuestionDifficulty.BEGINNER,
  answer,
  setTimeUp,
  questionId,
}: QuestionTimerProps) {
  const [progress, setProgress] = useState(time);

  const settings = difficultySettings[difficulty] || difficultySettings[QuestionDifficulty.BEGINNER];

  useEffect(() => {
    setProgress(time);
  }, [questionId]);

  useEffect(() => {
    // Clear interval if user give answer
    if (answer) return;

    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        console.log('Count');
        if (prevProgress > 1) return prevProgress - 1;
        return 0;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [answer]);

  useEffect(() => {
    if (progress < 1) {
      setTimeUp(true);
    }
  }, [progress]);

  const progressPercentage = (progress / time) * 100;

  return (
    <View style={{ width: `${settings.width}%`, right: settings.padding, padding: 12, height: 60 }}>
      <TimerBar progress={progressPercentage} progressColor={'#007aff'} />
      <Text>{progress}s</Text>
    </View>
  );
}

export default QuestionTimer;
