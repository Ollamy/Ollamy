import OptionDropdownMenu from 'pages/NewCourse/Section/LessonTable/OptionDropdownMenu/OptionDropdownMenu';
import { sectionActions } from 'services/api/routes/section';
import styled from 'styled-components';

import { InfoCircledIcon } from '@radix-ui/react-icons';
import { Table, Text, Tooltip } from '@radix-ui/themes';

interface LessonTableProps {
  sectionId: string;
}

function LessonTable({ sectionId }: LessonTableProps) {
  const { data } = sectionActions.useGetSectionLessons({ id: sectionId });

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
                  <OptionDropdownMenu lessonId={id} />
                </Table.Cell>
              </Table.Row>
            ),
          )}
        </Table.Body>
      </Table.Root>
    </Container>
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

export default LessonTable;
