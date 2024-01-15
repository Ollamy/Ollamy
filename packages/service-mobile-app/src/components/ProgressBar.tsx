import { Box } from "native-base";

interface ProgressBarProps {
  progress: number;
  progressColor?: string;
  backgroundColor?: string;
}

const ProgressBar = ({
  progress,
  progressColor = "#02DC0A",
  backgroundColor = "#fff",
}: ProgressBarProps) => {
  return (
    <Box h="6px" w="full" backgroundColor={backgroundColor} borderRadius="full" overflow="hidden">
      <Box h="full" w={`${progress * 100}%`} backgroundColor={progressColor} />
    </Box>
  );
};

export default ProgressBar;
