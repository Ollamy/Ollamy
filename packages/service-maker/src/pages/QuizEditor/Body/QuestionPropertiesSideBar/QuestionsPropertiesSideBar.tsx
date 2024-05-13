import type { ReactElement } from 'react';
import { useCallback } from 'react';
import DifficultyPicker from 'pages/QuizEditor/Body/QuestionPropertiesSideBar/DifficultyPicker/DifficultyPicker';
import type { Difficulty } from 'pages/QuizEditor/Factory/factory.types';
import { questionActions } from 'services/api/routes/question';
import styled from 'styled-components';

interface QuestionsPropertiesSideBarProps {
  questionId: string;
}

function QuestionsPropertiesSideBar({
  questionId,
}: QuestionsPropertiesSideBarProps): ReactElement {
  const { data } = questionActions.useQuestion({ id: questionId });
  const { mutateAsync: updateQuestion } = questionActions.useUpdateQuestion();

  const handleDifficultyClick = useCallback(
    async (difficulty: Difficulty) => {
      await updateQuestion({
        id: questionId,
        updateQuestionModel: {
          difficulty,
        },
      });
    },
    [questionId, updateQuestion],
  );

  return (
    <Container>
      <DifficultyPicker
        questionId={questionId}
        onClick={handleDifficultyClick}
        difficulty={data?.difficulty as Difficulty}
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 260px;
  padding: 16px;

  background: #ffffff;
  border: 1px solid #e7e7e7;
`;

export default QuestionsPropertiesSideBar;
