import { Text, View } from 'native-base';
import React, { useEffect, useMemo, useState } from 'react';
import TimerBar from 'src/components/TimerBar/TimerBar';

interface QuestionTimerProps {
  time: number;
  answer: string | undefined;
  setTimeUp: (v: boolean) => void;
  questionId: string;
  isBonus: boolean;
}

function QuestionTimer({ time, answer, setTimeUp, questionId, isBonus }: QuestionTimerProps) {
  const [progress, setProgress] = useState(time);

  useEffect(() => {
    setProgress(time);
  }, [questionId]);

  useEffect((): (() => void) => {
    // Clear interval if user give answer
    if (answer) return () => {};

    const interval = setInterval(() => {
      setProgress((prevProgress) => {
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

  const progressPercentage = useMemo(() => (progress / time) * 100, [progress, time]);

  return (
    <View style={{ flexGrow: 100, paddingTop: 12, height: 60 }}>
      <TimerBar progress={progressPercentage} progressColor={isBonus ? '#F7AC16' : '#007aff'} />
      <Text>{progress}s</Text>
    </View>
  );
}

export default QuestionTimer;
