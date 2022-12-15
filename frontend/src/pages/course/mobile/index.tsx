import {PagesProps} from "src/pages/interface";
import styled from "styled-components";
import TopBar from '../../../Components/Topbar/navigation/index';
import { useCallback } from 'react';
import { uuid } from 'UUID';
import LessonCard from '../../../Components/Lesson/LessonCard';

export interface CourseLessons {
  id: uuid
  name: string
  completion: number
}

export interface getCourseLessons {
  courseId: uuid;
  lessons: CourseLessons[];
}

const CourseMobile = ({ children }: PagesProps): JSX.Element => {
  const lessons : getCourseLessons = {
      courseId: "ddf4ec27-1445-4363-ad50-6631fda0d360",
      lessons: [
        {id: 'ddf4ec27-1445-4363-ad50-6631fda0d360', completion: 50, name: "Intro" },
        {id: 'ddf4ec27-1445-4363-ad50-6631fda0d370', completion: 20, name: "Setup" },
        {id: 'ddf4ec27-1445-4363-dd50-6631fda0d370', completion: 20, name: "Setup" },
        {id: 'ddf4ec27-1445-4363-ed50-6631fda0d370', completion: 20, name: "Setup" },
        {id: 'ddf4ec27-1445-4363-ed50-6631fda0d370', completion: 20, name: "Setup" },
        {id: 'ddf4ec27-1445-4363-ed50-6631fda0d370', completion: 20, name: "Setup" },
        {id: 'ddf4ec27-1445-4363-ed50-6631fda0d370', completion: 20, name: "Setup" },
        {id: 'ddf4ec27-1445-4363-ed50-6631fda0d370', completion: 20, name: "Setup" },
        {id: 'ddf4ec27-1445-4363-ed50-6631fda0d370', completion: 20, name: "Setup" },
      ]
    }
  const lessonPadding = [30, 90, 150, 220, 150, 90, 30]
  return (
    <Container>
      {children}
      <TopBar/>
      <Lessons>
        {lessons.lessons.map((lesson, idx) => <LessonCard {...lesson} marginLeft={lessonPadding[idx % lessonPadding.length]}/>)} 
      </Lessons>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  background: #fafafa;
`;

const Lessons = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  gap: 25px;
  padding: 25px
`;
export default CourseMobile;
