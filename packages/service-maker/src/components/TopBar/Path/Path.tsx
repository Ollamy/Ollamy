import { SlashIcon } from '@radix-ui/react-icons';
import { TabNav } from '@radix-ui/themes';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { courseActions } from 'services/api/routes/course';
import { lessonActions } from 'services/api/routes/lesson';
import { questionActions } from 'services/api/routes/question';
import { sectionActions } from 'services/api/routes/section';
import { styled } from 'styled-components';

interface PathProps {
  urlParams: {
    id?: string;
    sectionId?: string;
    lessonId?: string;
    questionId?: string;
  };
}

type ElementType = 'course' | 'section' | 'lesson' | 'question';

interface NavElement {
  element: ElementType;
  value: string;
}

const Path = ({ urlParams }: PathProps) => {
  const navigate = useNavigate();

  const { data: courseData } = courseActions.useCourse(
    { id: urlParams.id! },
    { enabled: !!urlParams.id },
  );

  const { data: sectionData } = sectionActions.useSection(
    { id: urlParams.sectionId! },
    { enabled: !!urlParams.sectionId },
  );

  const { data: lessonData } = lessonActions.useLesson(
    { id: urlParams.lessonId! },
    { enabled: !!urlParams.lessonId },
  );

  const { data: questionData } = questionActions.useQuestion(
    { id: urlParams.questionId! },
    { enabled: !!urlParams.questionId },
  );

  const navData = useMemo<NavElement[]>(() => {
    const data: NavElement[] = [];

    if (!!courseData)
      data.push({
        element: 'course',
        value: courseData.title,
      });

    if (!!sectionData)
      data.push({
        element: 'section',
        value: sectionData.title,
      });

    if (!!lessonData)
      data.push({
        element: 'lesson',
        value: lessonData.title,
      });

    if (!!questionData)
      data.push({
        element: 'question',
        value: questionData.title,
      });
    return data;
  }, [courseData, sectionData, lessonData, questionData]);

  return (
    <Container>
      {navData.map((elem, index) => {
        return (
          <>
            <Link key={elem.element}>{elem.value}</Link>
            {index < navData.length - 1 && <SlashIcon color='#9c9c9c' />}
          </>
        );
      })}
    </Container>
  );
};

const Link = styled.span`
  cursor: pointer;
  color: #9c9c9c;

  &:hover {
    color: #3d3d3d;
    text-decoration: underline;
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
`;

export default Path;
