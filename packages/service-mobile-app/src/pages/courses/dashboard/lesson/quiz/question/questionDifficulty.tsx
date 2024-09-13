// @ts-ignore
import STAR from 'assets/icons/star.png';
import { Box, HStack, Image } from 'native-base';
import { QuestionDifficulty } from 'src/services/question/question.dto';

interface QuestionDifficultyStarsProps {
  difficulty: QuestionDifficulty;
}

const DIFFICULTY_TO_NUMBER: Record<QuestionDifficulty, number> = {
  [QuestionDifficulty.BEGINNER]: 1,
  [QuestionDifficulty.INTERMEDIATE]: 2,
  [QuestionDifficulty.ADVANCED]: 3,
  [QuestionDifficulty.MASTER]: 4,
};

function QuestionDifficultyStars({ difficulty }: QuestionDifficultyStarsProps) {
  return (
    <HStack w={'full'}>
      <HStack
        width={`${DIFFICULTY_TO_NUMBER[difficulty] * 33}px`}
        borderRadius={8}
        paddingY={'6px'}
        backgroundColor={'#ECE6FC'}
        style={{ gap: 5 }}
        justifyContent={'center'}
      >
        {Array.from({ length: DIFFICULTY_TO_NUMBER[difficulty] }, (_, idx) => (
          <Box key={idx} height={'20px'} width={'20px'}>
            <Image style={{ height: '100%', width: '100%' }} source={STAR} alt={'difficulty star'} />
          </Box>
        ))}
      </HStack>
    </HStack>
  );
}

export default QuestionDifficultyStars;
