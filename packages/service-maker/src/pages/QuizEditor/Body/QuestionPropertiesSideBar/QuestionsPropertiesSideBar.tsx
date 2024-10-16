import type { ReactElement } from 'react';
import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import CustomAlertDialog from 'components/RadixUi/AlertDialog/CustomAlertDialog';
import DifficultyPicker from 'pages/QuizEditor/Body/QuestionPropertiesSideBar/DifficultyPicker/DifficultyPicker';
import type { Difficulty } from 'pages/QuizEditor/Factory/factory.types';
import { questionActions } from 'services/api/routes/question';
import styled from 'styled-components';

import { TitlePart } from 'pages/QuizEditor/Body/QuestionPropertiesSideBar/style';

import { Button, Separator } from '@radix-ui/themes';

interface QuestionsPropertiesSideBarProps {
  questionId: string;
}

const timeChoices = [15, 30, 60, 120] as const;

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
      <SubContainer>
        <DifficultyPicker
          questionId={questionId}
          onClick={handleDifficultyClick}
          difficulty={data?.difficulty as Difficulty}
        />
        <Separator size={'4'} />
        <TitlePart>Settings</TitlePart>
        <SettingsContainer>
          <SettingsTitle>Bonus</SettingsTitle>
          <input
            type={'checkbox'}
            checked={data?.bonus ?? false}
            onChange={async () => {
              await updateQuestion({
                id: questionId,
                updateQuestionModel: {
                  bonus: !(data?.bonus ?? false),
                },
              });
            }}
          />
        </SettingsContainer>
        <SettingsContainer>
          <SettingsTitle>Time</SettingsTitle>
          <input
            type={'checkbox'}
            checked={!!data?.time}
            onChange={async (event) => {
              const newValue = event.target.checked;
              await updateQuestion({
                id: questionId,
                updateQuestionModel: {
                  time: newValue ? 15 : undefined,
                },
              });
            }}
          />
        </SettingsContainer>
        {!!data?.time && (
          <SettingsContainer>
            {timeChoices.map((time) => (
              <Button
                key={time}
                color={'purple'}
                variant={time === data?.time ? 'soft' : 'outline'}
                onClick={async () => {
                  await updateQuestion({
                    id: questionId,
                    updateQuestionModel: {
                      time,
                    },
                  });
                }}
              >
                {time}
              </Button>
            ))}
          </SettingsContainer>
        )}
      </SubContainer>
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

const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const SettingsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

const SettingsTitle = styled.p`
  margin: 0;
  color: #3d3d3d;
`;

export default QuestionsPropertiesSideBar;
