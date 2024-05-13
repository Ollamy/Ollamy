import type { ReactElement } from 'react';
import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import CustomAlertDialog from 'components/RadixUi/AlertDialog/CustomAlertDialog';
import DifficultyPicker from 'pages/QuizEditor/Body/QuestionPropertiesSideBar/DifficultyPicker/DifficultyPicker';
import type { Difficulty } from 'pages/QuizEditor/Factory/factory.types';
import { questionActions } from 'services/api/routes/question';
import styled from 'styled-components';

import { Button } from '@radix-ui/themes';

interface QuestionsPropertiesSideBarProps {
  questionId: string;
}

function QuestionsPropertiesSideBar({
  questionId,
}: QuestionsPropertiesSideBarProps): ReactElement {
  const [, setSearchParams] = useSearchParams();
  const { data } = questionActions.useQuestion({ id: questionId });
  const { mutateAsync: updateQuestion } = questionActions.useUpdateQuestion();
  const { mutateAsync: removeQuestion } = questionActions.useRemoveQuestion();

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

  const handleRemoveQuestion = useCallback(async () => {
    await removeQuestion({ idQuestionModel: { id: questionId } }).then(() =>
      setSearchParams('questionId', undefined),
    );
  }, [questionId, removeQuestion, setSearchParams]);

  return (
    <Container>
      <DifficultyPicker
        questionId={questionId}
        onClick={handleDifficultyClick}
        difficulty={data?.difficulty as Difficulty}
      />
      <CustomAlertDialog
        description={
          'This action cannot be undone. This will permanently delete this question and remove your data from our servers.'
        }
        actionButtonValue={'Yes, delete question'}
        TriggerButton={
          <Button style={{ width: '100%' }} color={'red'} variant={'soft'}>
            Remove question
          </Button>
        }
        onAction={handleRemoveQuestion}
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 260px;
  min-width: 260px;
  padding: 16px;
  box-sizing: border-box;

  background: #ffffff;
`;

export default QuestionsPropertiesSideBar;
