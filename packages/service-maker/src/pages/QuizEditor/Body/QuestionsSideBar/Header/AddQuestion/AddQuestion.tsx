import { useCallback, useState } from 'react';
import CustomDialogTitleDescription from 'components/RadixUi/Dialog/CustomDialogTitleDescription';
import { CreateQuestionModelTypeAnswerEnum } from 'services/api/out';
import { questionActions } from 'services/api/routes/question';
import { styled } from 'styled-components';

import 'styles/dropdownMenu.css';

import * as Collapsible from '@radix-ui/react-collapsible';
import { Cross2Icon, PlusIcon } from '@radix-ui/react-icons';
import { Button, Card, IconButton } from '@radix-ui/themes';

const answerTypeMap: Record<CreateQuestionModelTypeAnswerEnum, string> = {
  [CreateQuestionModelTypeAnswerEnum.FreeAnswer]: 'free',
  [CreateQuestionModelTypeAnswerEnum.MultipleChoice]: 'multiple choice',
  [CreateQuestionModelTypeAnswerEnum.SquareChoice]: 'square',
};

interface AddQuestionProps {
  lessonId: string;
}

type MoreOptionsType = { typeAnswer: CreateQuestionModelTypeAnswerEnum };

function AddQuestion({ lessonId }: AddQuestionProps) {
  const [open, setOpen] = useState(false);

  const { mutateAsync: createNewQuestion } =
    questionActions.useCreateQuestion();

  const handleCreate = useCallback(
    async (
      title: string,
      description: string,
      moreOptions?: MoreOptionsType
    ) => {
      if (!moreOptions?.typeAnswer) {
        // eslint-disable-next-line no-console
        console.error('moreOptions is missed');
        return;
      }

      createNewQuestion({
        createQuestionModel: {
          lessonId,
          title,
          description,
          typeAnswer: moreOptions.typeAnswer,
          typeQuestion: 'TEXT',
          picture: '',
          difficulty: 'BEGINNER',
          points: 0,
        },
      }).finally(() => {
        // setOpen(false);
      });
    },
    [createNewQuestion, lessonId]
  );

  return (
    <Container>
      <Collapsible.Root
        className={'CollapsibleRoot'}
        open={open}
        onOpenChange={setOpen}
      >
        <CustomCard variant={'classic'} open={open}>
          <CourseHeader>
            <TitleContainer>Add question</TitleContainer>
            <Collapsible.Trigger asChild>
              <IconButton variant={'ghost'} radius={'full'}>
                {open ? <Cross2Icon /> : <PlusIcon />}
              </IconButton>
            </Collapsible.Trigger>
          </CourseHeader>
          <CustomCollapsibleContent>
            <ButtonContainer>
              {Object.entries(answerTypeMap).map(([key, value]) => (
                <CustomDialogTitleDescription<MoreOptionsType>
                  key={key}
                  dialogTitle={`Create a ${value} question`}
                  dialogDescription={
                    'Define the title, description and picture of your new question.'
                  }
                  actionButtonValue={'New question'}
                  TriggerButton={
                    <CustomButton color={'gray'} variant={'soft'}>
                      {value}
                    </CustomButton>
                  }
                  createFunction={handleCreate}
                  moreOptions={{
                    typeAnswer: key as CreateQuestionModelTypeAnswerEnum,
                  }}
                />
              ))}
            </ButtonContainer>
          </CustomCollapsibleContent>
        </CustomCard>
      </Collapsible.Root>
    </Container>
  );
}

const Container = styled.div``;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;

  gap: 4px;
`;

const CustomButton = styled(Button)`
  width: 100%;
`;

interface CustomCardProps {
  open: boolean;
}

const CustomCard = styled(Card) <CustomCardProps>`
  display: flex;
  flex-direction: column;

  gap: ${({ open }) => (open ? '20px' : 'unset')};
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;

  gap: 8px;
`;

const CourseHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CustomCollapsibleContent = styled(Collapsible.Content)`
  display: flex;
  flex-direction: column;

  gap: 20px;
`;

export default AddQuestion;
