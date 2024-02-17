// @ts-ignore
import STAR from 'assets/icons/star.png';
import { Box, HStack, Image, View } from 'native-base';

interface QuestionDifficultyProps {
  difficulty: number;
}

function QuestionDifficulty({ difficulty }: QuestionDifficultyProps) {
  return (
    <HStack
      width={`${difficulty * 33}px`}
      borderRadius={8}
      paddingY="6px"
      backgroundColor="#ECE6FC"
      style={{ gap: 5 }}
      justifyContent="center"
    >
      {Array.from({ length: difficulty }, (_, idx) => (
        <Box key={idx} height="20px" width="20px">
          <Image style={{ height: '100%', width: '100%' }} source={STAR} alt="difficulty star" />
        </Box>
      ))}
    </HStack>
  );
}

export default QuestionDifficulty;
