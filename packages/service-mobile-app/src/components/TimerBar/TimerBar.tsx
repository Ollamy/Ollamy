// @ts-ignore
import CLOCK from 'assets/timer-clock.jpg';
import { Box, Image } from 'native-base';

interface TimerBarProps {
  progress: number;
  progressColor?: string;
  backgroundColor?: string;
}

function TimerBar({ progress, progressColor = '#007aff', backgroundColor = '#DEDEDE' }: TimerBarProps) {
  return (
    <Box flexDirection={'row'} alignItems={'center'}>
      <Box h={'6px'} flex={1} backgroundColor={backgroundColor} borderRadius={'full'} overflow={'hidden'}>
        <Box h={'full'} w={`${progress}%`} backgroundColor={progressColor} />
      </Box>
      <Box ml={2} backgroundColor={'white'} borderRadius={'full'} overflow={'hidden'} p={1}>
        <Image style={{ height: 30, width: 30 }} source={CLOCK} alt={'Timer clock'} />
      </Box>
    </Box>
  );
}

export default TimerBar;
