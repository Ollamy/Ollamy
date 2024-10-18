import { Box } from 'native-base';

interface ProgressBarProps {
  progress: number;
  nextProgress?: number;
  progressColor?: string;
  backgroundColor?: string;
  nextProgressColor?: string;
}

function ProgressBar({
  progress,
  nextProgress = progress,
  progressColor = '#02DC0A',
  backgroundColor = '#DEDEDE',
  nextProgressColor = '#bce8be64',
}: ProgressBarProps) {
  return (
    <Box h={'6px'} flex={'1'} backgroundColor={backgroundColor} borderRadius={'full'} overflow={'hidden'}>
      <Box h={'full'} w={`${nextProgress * 100}%`} backgroundColor={nextProgressColor}>
        <Box h={'full'} w={`${progress * 100}%`} backgroundColor={progressColor} />
      </Box>
    </Box>
  );
}

export default ProgressBar;
