import SectionHeader from 'pages/CourseManager/Section/Header/SectionHeader';
import LessonTable from 'pages/CourseManager/Section/LessonTable/LessonTable';
import styled from 'styled-components';

import { Separator } from '@radix-ui/themes';

interface SectionProps {
  sectionId: string;
}

function Section({ sectionId }: SectionProps) {
  return (
    <Container>
      <SectionHeader sectionId={sectionId} />
      <Separator style={{ height: '2px' }} size={'4'} />
      <Body>
        <LessonTable sectionId={sectionId} />
      </Body>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;

  gap: 42px;

  padding: 42px;
  box-sizing: border-box;
`;

const Body = styled.div``;

export default Section;
