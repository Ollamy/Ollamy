import { sectionActions } from 'services/api/routes/section';
import styled from 'styled-components';

import { TrashIcon } from '@radix-ui/react-icons';
import { IconButton, Table, Text } from '@radix-ui/themes';

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
            <Table.ColumnHeaderCell>Number of question</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Number of lecture</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Options</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data.map(({ id, title }) => (
            <Table.Row key={id}>
              <Table.RowHeaderCell>{title}</Table.RowHeaderCell>
              <Table.Cell>42</Table.Cell>
              <Table.Cell>24</Table.Cell>
              <IconButton>
                <TrashIcon />
              </IconButton>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Container>
  ) : (
    <Text>No lessons yet</Text>
  );
}

const Container = styled.div``;

export default LessonTable;
