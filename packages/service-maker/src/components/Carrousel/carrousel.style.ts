import styled from "styled-components";

export const ContainerHeight = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
  width: 100%;
`;

export const ContainerWidth = styled.div<{ $width: string }>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: ${(props) => props.$width};
  border-radius: 8px;
  height: 340px;
  margin: 24px;
  padding: 12px;
  gap: 40px;
  background-color: #ffffff;
`;

export const ContainerPlacement = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  flex: 1;
  gap: 8px;
`;

export const ContainerSpaceAroundElement = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  gap: 60px;
  margin-top: 20px;
  flex: 1;
`;

export const BaseDiv = styled.div`
  color: #556080;
`;

export const CourseCard = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
  justify-content: center;
  align-items: center;
  border-radius: 0.75rem;
  gap: 40px;
  background-color: #f1f3f6;
`;

export const SubTitle = styled.h3`
  margin: 0;
  font-weight: 500;
  color: #556080;
  font-style: normal;
  font-weight: 600;
`;

export const Title = styled.h2`
  margin: 0;
  color: #556080;
`;
