import { SlashIcon } from '@radix-ui/react-icons';
import { TabNav } from '@radix-ui/themes';
import { Fragment, useMemo } from 'react';
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

  const handleClick = (element: ElementType) => {
    console.log('element :', element);
    switch (element) {
      case ElementType.COURSE:
        console.log('course');
        navigate(`/course/${urlParams.id}`);
        break;
      case ElementType.SECTION:
        console.log('section');
        navigate(`/course/${urlParams.id}/section/${urlParams.sectionId}`);
        break;
      case ElementType.LESSON:
        console.log('lesson');
        navigate(
          `/quiz/${urlParams.id}/section/${urlParams.sectionId}/lesson/${urlParams.lessonId}`,
        );
        break;
      case ElementType.QUESTION:
        console.log('question');
        navigate(
          `/quiz/${urlParams.id}/section/${urlParams.sectionId}/lesson/${urlParams.lessonId}/question/${urlParams.questionId}`,
        );
        break;
      default:
    }
  };

  const navData = useMemo<NavElement[]>(() => {
    const data: NavElement[] = [];

    if (!!courseData)
      data.push({
        element: ElementType.COURSE,
        value: courseData.title,
      });

    if (!!sectionData)
      data.push({
        element: ElementType.SECTION,
        value: sectionData.title,
      });

    if (!!lessonData)
      data.push({
        element: ElementType.LESSON,
        value: lessonData.title,
      });

    if (!!questionData)
      data.push({
        element: ElementType.QUESTION,
        value: questionData.title,
      });
    return data;
  }, [courseData, sectionData, lessonData, questionData]);

  return (
    <Container>
      {navData.map((elem, index) => {
        return (
          <Fragment key={elem.element}>
            <Link onClick={() => handleClick(elem.element)} key={elem.element}>
              {elem.value}
            </Link>
            {index < navData.length - 1 && <SlashIcon color="#9c9c9c" />}
          </Fragment>
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
