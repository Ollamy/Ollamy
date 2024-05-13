import { Difficulty } from 'pages/QuizEditor/Factory/factory.types';
import styled from 'styled-components';

interface DifficultyPickerProps {
  maxDifficulty?: number;
  difficulty: Difficulty;
  onClick: (difficulty: Difficulty) => void;
}

const difficultyToNumber: Record<Difficulty, number> = {
  [Difficulty.BEGINNER]: 1,
  [Difficulty.INTERMEDIATE]: 2,
  [Difficulty.ADVANCED]: 3,
};

function DifficultyPicker({
  difficulty,
  onClick,
  maxDifficulty = 3,
}: DifficultyPickerProps) {
  return (
    <Container>
      <h2>
        <u>Difficulty</u>
      </h2>

      <StarsContainer>
        {Array.from({ length: maxDifficulty }).map((_, index) => (
          <Star
            $isActive={index < difficultyToNumber[difficulty]}
            src="/star.png"
            key={index}
            onClick={() =>
              onClick(
                Object.entries(difficultyToNumber).find(
                  (o) => o[1] === index + 1,
                )?.[0] as Difficulty,
              )
            }
          />
        ))}
      </StarsContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

const StarsContainer = styled.div`
  display: flex;

  gap: 10px;
`;

interface ImageProps {
  $isActive: boolean;
}

const Star = styled.img<ImageProps>`
  cursor: pointer;
  filter: ${(props) => (props.$isActive ? null : 'grayscale(100%)')};
`;

export default DifficultyPicker;
