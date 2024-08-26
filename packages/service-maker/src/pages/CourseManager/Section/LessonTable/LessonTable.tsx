import OptionDropdownMenu from 'pages/CourseManager/Section/LessonTable/OptionDropdownMenu/OptionDropdownMenu';
import { sectionActions } from 'services/api/routes/section';
import styled from 'styled-components';

import { GearIcon, InfoCircledIcon } from '@radix-ui/react-icons';
import { IconButton, Skeleton, Table, Text, Tooltip } from '@radix-ui/themes';
import CustomDialogTitleDescription from 'components/RadixUi/Dialog/CustomDialogTitleDescription';
import { useCallback } from 'react';
import { lessonActions } from 'services/api/routes/lesson';
import { CreateQuestionModelTypeAnswerEnum } from 'services/api/out';

interface LessonTableProps {
  sectionId: string;
}

type MoreOptionsType = { lessonId: string };

function LessonTable({ sectionId }: LessonTableProps) {
  const { data } = sectionActions.useGetSectionLessons({ id: sectionId });
  const { mutateAsync: updateLesson } = lessonActions.useUpdateLesson();

  const handleEditLesson = useCallback(
    async (
      title: string,
      description: string,
      moreOptions?: MoreOptionsType,
    ) => {
      await updateLesson({
        id: moreOptions?.lessonId as string,
        updateLessonModel: { title, description },
      });
    },
    [updateLesson],
  );

  return data && data.length ? (
    <Container>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Lesson name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell justify={'center'}>
              Number of question
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell justify={'center'}>
              Number of lecture
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell justify={'center'}>
              Options
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data.map(
            ({
              id,
              title,
              description,
              numberOfQuestions,
              numberOfLectures,
            }) => (
              <Table.Row key={id} align={'center'}>
                <Table.RowHeaderCell>
                  <LessonNameContainer>
                    {title}
                    <Tooltip content={description}>
                      <InfoCircledIcon color={'gray'} />
                    </Tooltip>
                  </LessonNameContainer>
                </Table.RowHeaderCell>
                <Table.Cell justify={'center'}>{numberOfQuestions}</Table.Cell>
                <Table.Cell justify={'center'}>{numberOfLectures}</Table.Cell>
                <Table.Cell justify={'center'}>
                  <ActionsContainer>
                    <CustomDialogTitleDescription<MoreOptionsType>
                      dialogTitle={'Edit section'}
                      dialogDescription={
                        'Edit the title and description of your current section.'
                      }
                      defaultTitle={title}
                      defaultDescription={description}
                      actionButtonValue={'Update'}
                      TriggerButton={
                        <IconButton variant={'surface'} color={'orange'}>
                          <GearIcon />
                        </IconButton>
                      }
                      createFunction={handleEditLesson}
                      moreOptions={{ lessonId: id }}
                    />
                    <OptionDropdownMenu lessonId={id} />
                  </ActionsContainer>
                </Table.Cell>
              </Table.Row>
            ),
          )}
        </Table.Body>
      </Table.Root>
    </Container>
  ) : !data ? (
    <SkeletonsContainer>
      <Skeleton width="100%" height="40px" />
      <Skeleton width="100%" height="40px" />
    </SkeletonsContainer>
  ) : (
    <Text>No lessons yet</Text>
  );
}

const Container = styled.div``;

const LessonNameContainer = styled.div`
  display: flex;
  align-items: center;

  gap: 12px;
`;

const ActionsContainer = styled(LessonNameContainer)`
  justify-content: center;
`;

const SkeletonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export default LessonTable;
