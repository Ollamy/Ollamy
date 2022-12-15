import Image from "next/image";
import { useCallback } from "react";
import styled from "styled-components";
import { Emptybar } from "src/Components/Lesson/LessonCard";
import { Progress } from '../../Lesson/LessonCard';

const TopBarLesson = (): JSX.Element => {
  const handleClickEarth = useCallback(() => {
      console.log("handleClickEarth")
  }, []);

  const handleClickChest = useCallback(() => {
      console.log("handleClickChest")
  }, []);

  const handleClickProfile = useCallback(() => {
    console.log("handleClickProfile")
  }, []);
 
  return (
    <Container>
      <CloseButton/>
      <EmptyBarLesson >
        <ProgressLesson percent={30} />
      </EmptyBarLesson>
      <LifeContainer>
        4
      </LifeContainer>
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

export const CloseButton = styled.div`
  width: 25px;
  height: 25px;
  background: red;
`;

export const LifeContainer = styled.div`
  color: #3D3D3D;
  border-radius: 8px;
  padding: 16px 20px;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25),
    -1px -1px 4px rgba(0, 0, 0, 0.25);
  background: #D9D9D9;
`;

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #3D3D3D;
  border-radius: 0px 0px 8px 8px;
  padding: 16px 20px;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);;
  background: #D9D9D9;
  height: 70px;
`;

export default TopBarLesson;