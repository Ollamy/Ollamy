import React, { useEffect, useState } from 'react';
import { Text, View } from 'native-base';
import TimerBar from 'src/components/TimerBar/TimerBar';
import { QuestionDifficulty } from 'src/services/question/question.dto';

interface QuestionTimerProps {
  time: number;
  difficulty?: QuestionDifficulty;
  answer: string | undefined;
  onTimeUp: () => void;
}

const difficultySettings = {
  [QuestionDifficulty.BEGINNER]: { padding: 330, width: 90 },
  [QuestionDifficulty.INTERMEDIATE]: { padding: 290, width: 80 },
  [QuestionDifficulty.ADVANCED]: { padding: 270, width: 75 },
  [QuestionDifficulty.MASTER]: { padding: 230, width: 65 },
};

function QuestionTimer({ time, difficulty = QuestionDifficulty.BEGINNER, answer, onTimeUp }: QuestionTimerProps) {
  const [progress, setProgress] = useState(time);

  const settings = difficultySettings[difficulty] || difficultySettings[QuestionDifficulty.BEGINNER];

  useEffect(() => {
    setProgress(time);

    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress > 1) return prevProgress - 1;
        else {
          clearInterval(timer);
          onTimeUp();
          return 0;
        }
      });
    }, 1000);

    if (answer) {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [time, difficulty, answer]);

  const progressPercentage = (progress / time) * 100;

  return (
    <View style={{ width: `${settings.width}%`, right: settings.padding, padding: 12, height: 60 }}>
      <TimerBar progress={progressPercentage} progressColor="#007aff" />
      <Text>{progress}s</Text>
    </View>
  );
}

export default QuestionTimer;
