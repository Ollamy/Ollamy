import Image from "next/image";
import { useCallback } from "react";
import styled from "styled-components";
import { Emptybar } from "src/Components/Lesson/LessonCard";
import { Progress } from '../../Lesson/LessonCard';
import closeIcon from './../../../../public/assets/Topbar/close.svg';
import LifeCounter from "./lifeCounter";

interface TopBarLessonProps {
  completion: number
  lifeCount: number
};

const TopBarLesson = ({ completion, lifeCount }: TopBarLessonProps): JSX.Element => {
  const handlClose = useCallback(() => {
    window.open('/course', '_self');
    console.log("Close")
  }, []);
 
  return (
    <Container>
      <Image src={closeIcon} alt={""} onClick={handlClose}/>
      <EmptyBarLesson>
        <ProgressLesson percent={completion} />
      </EmptyBarLesson>
      <LifeCounter lifeCount={lifeCount}/>
    </Container>
  );
};

export const ProgressLesson = styled(Progress)`
  background: #876BF6;
`;

export const EmptyBarLesson = styled(Emptybar)`
  width: 50%;
  height: 8px;
`;

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #3D3D3D;
  border-radius: 0px 0px 8px 8px;
  padding: 16px 20px;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(113, 112, 112, 0.25);;
  background: white;
  height: 9%;
`;

export default TopBarLesson;