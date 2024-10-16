import { Fragment, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { courseActions } from 'services/api/routes/course';
import { lessonActions } from 'services/api/routes/lesson';
import { questionActions } from 'services/api/routes/question';
import { sectionActions } from 'services/api/routes/section';
import { styled } from 'styled-components';

import { SlashIcon } from '@radix-ui/react-icons';

interface PathProps {
  urlParams: {
    id?: string;
    sectionId?: string;
    lessonId?: string;
    questionId?: string;
  };
}

enum ElementType {
  COURSE = 'course',
  SECTION = 'section',
  LESSON = 'lesson',
  QUESTION = 'question',
}

interface NavElement {
  element: ElementType;
  value: string;
}

function Path({ urlParams }: PathProps) {
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

  const handleClick = (element: ElementType) => {
    switch (element) {
      case ElementType.COURSE:
        navigate(`/course/${urlParams.id}`);
        break;
      case ElementType.SECTION:
        navigate(`/course/${urlParams.id}/section/${urlParams.sectionId}`);
        break;
      case ElementType.LESSON:
        navigate(
          `/course/${urlParams.id}/section/${urlParams.sectionId}/lesson/${urlParams.lessonId}`,
        );
        break;
      case ElementType.QUESTION:
        navigate(
          `/course/${urlParams.id}/section/${urlParams.sectionId}/lesson/${urlParams.lessonId}/question/${urlParams.questionId}`,
        );
        break;
      default:
    }
  };

  const navData = useMemo<NavElement[]>(() => {
    const data: NavElement[] = [];

    if (courseData)
      data.push({
        element: ElementType.COURSE,
        value: courseData.title,
      });

    if (sectionData)
      data.push({
        element: ElementType.SECTION,
        value: sectionData.title,
      });

    if (lessonData)
      data.push({
        element: ElementType.LESSON,
        value: lessonData.title,
      });

    if (questionData)
      data.push({
        element: ElementType.QUESTION,
        value: questionData.title,
      });
    return data;
  }, [courseData, sectionData, lessonData, questionData]);

  return (
    <Container>
      {navData.map((elem, index) => (
        <Fragment key={elem.element}>
          <Link onClick={() => handleClick(elem.element)} key={elem.element}>
            {elem.value}
          </Link>
          {index < navData.length - 1 && <SlashIcon color="#9c9c9c" />}
        </Fragment>
      ))}
    </Container>
  );
}

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
