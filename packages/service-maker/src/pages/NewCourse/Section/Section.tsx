import styled from 'styled-components';
import SectionHeader from 'pages/NewCourse/Section/Header/SectionHeader';
import LessonTable from 'pages/NewCourse/Section/LessonTable/LessonTable';
import { Separator } from '@radix-ui/themes';

interface SectionProps {
  sectionId: string;
}

const Section = ({ sectionId }: SectionProps) => {
  return (
    <Container>
      <SectionHeader sectionId={sectionId} />
      <Separator style={{ height: '2px' }} size={'4'} />
      <Body>
        <LessonTable />
      </Body>
    </Container>
  );
};

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
