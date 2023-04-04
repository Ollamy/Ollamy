import { useCallback } from 'react';
import { CourseLessons } from 'src/pages/Course/mobile';
import styled from 'styled-components';

export interface LessonCardProps extends CourseLessons {marginLeft?: number};

const LessonCard = ({id, name, completion, marginLeft}: LessonCardProps): JSX.Element => {
  const handleClickStartLesson = useCallback(() => {
    window.open(`/lesson/${id}`, '_self');
  }, []);

  return (
  <Container id={id} completion={marginLeft} onClick={handleClickStartLesson}>
    <ImgContainer>
      <img style={{width: 80}} src={'vercel.svg'}/>
    </ImgContainer>
    <CardBottom>
      {name}
      <Emptybar>
        <Progress percent={completion} />
      </Emptybar>
    </CardBottom>
  </Container>)
}

interface ContainerProps {
  completion: string
};

const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background: #E6674F;
  margin-left: ${({ completion = 0 }) => `${completion}px`};
  width: 93px;
  min-height: 110px;
  border-radius: 16px;
  border: 1px solid black;
`;

const ImgContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const CardBottom = styled.div`
  padding: 5px;
  display: flex;
  flex-direction: column;
  height: 60%;
  color: black;
  background: #fafafa;
  border-radius: 0px 0px 16px 16px;
`;

export const Progress = styled.div`
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 3px;
  transition: width 10s ease-in-out;
  background: #79CE87;
  width: ${({ percent }) => percent}%;
`;

export const Emptybar = styled.div`
  margin-top: 5px;
  border-radius: 3px;

  height: 7px;
  width: 100%;
  position: relative;
  background: #EAEAF4;
`;

export default LessonCard;