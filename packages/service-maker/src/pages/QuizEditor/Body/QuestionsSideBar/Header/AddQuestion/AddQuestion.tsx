import { useCallback, useEffect, useState } from 'react';
import CustomDialogTitleDescription from 'components/RadixUi/Dialog/CustomDialogTitleDescription';
import { CreateQuestionModelTypeAnswerEnum } from 'services/api/out';
import { questionActions } from 'services/api/routes/question';
import { styled } from 'styled-components';

import 'styles/dropdownMenu.css';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { PlusIcon } from '@radix-ui/react-icons';
import { IconButton } from '@radix-ui/themes';

const answerTypeMap: Record<CreateQuestionModelTypeAnswerEnum, string> = {
  [CreateQuestionModelTypeAnswerEnum.FreeAnswer]: 'free',
  [CreateQuestionModelTypeAnswerEnum.MultipleChoice]: 'multiple choice',
  [CreateQuestionModelTypeAnswerEnum.SquareChoice]: 'square',
};

interface AddQuestionProps {
  lessonId: string;
}

function AddQuestion({ lessonId }: AddQuestionProps) {
  const [open, setOpen] = useState(false);
  const [typeAnswer, setTypeAnswer] = useState<
    CreateQuestionModelTypeAnswerEnum | undefined
  >(undefined);

  const { mutateAsync: createNewQuestion } =
    questionActions.useCreateQuestion();

  const handleCancelRemoveLesson = useCallback(() => {
    setOpen(false);
  }, []);

  const handleCreateQuestion = useCallback(
    (type: CreateQuestionModelTypeAnswerEnum) => {
      setTypeAnswer(type);
    },
    [],
  );

  useEffect(() => {}, [typeAnswer]);

  const handleCreate = useCallback(
    async (title: string, description: string) => {
      if (!typeAnswer) {
        // eslint-disable-next-line no-console
        console.error('No answer selected');
        return;
      }

      createNewQuestion({
        createQuestionModel: {
          lessonId,
          title,
          description,
          typeAnswer,
          typeQuestion: 'TEXT',
          picture: '',
          difficulty: 'BEGINNER',
          points: 0,
        },
      }).finally(() => {
        setOpen(false);
      });
    },
    [createNewQuestion, lessonId, typeAnswer],
  );

  return (
    <DropdownMenu.Root open={open}>
      <DropdownMenu.Trigger asChild>
        <IconButton
          color={'gray'}
          variant={'outline'}
          onClick={() => setOpen((prev) => !prev)}
        >
          <PlusIcon />
        </IconButton>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          onPointerDownOutside={() => setOpen((prev) => !prev)}
          loop
          sideOffset={5}
          side={'right'}
          className={'DropdownMenuContent'}
        >
          {Object.entries(answerTypeMap).map(([name, value]) => (
            <DropdownMenu.Item
              key={name}
              className={'DropdownMenuItem'}
              style={{
                display: 'flex',
                paddingLeft: '8px',
                minWidth: '100%',
              }}
              onClick={() =>
                handleCreateQuestion(name as CreateQuestionModelTypeAnswerEnum)
              }
            >
              <CustomDialogTitleDescription
                dialogTitle={`Create a ${value} question`}
                actionButtonValue={'New question'}
                dialogDescription={
                  'Define the title, description and picture of your new question.'
                }
                TriggerButton={<AbsoluteContainer>{value}</AbsoluteContainer>}
                createFunction={handleCreate}
                onCancel={handleCancelRemoveLesson}
              />
            </DropdownMenu.Item>
          ))}
          <DropdownMenu.Arrow className={'DropdownMenuArrow'} />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

const AbsoluteContainer = styled.div`
  position: absolute;

  display: flex;
  align-items: center;

  width: 100%;
  height: 100%;
`;

export default AddQuestion;
