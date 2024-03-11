import styled from "styled-components";

export const RightContainerSetting = styled.div<{ $width: string }>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: ${(props) => props.$width};
  border-radius: 8px;
  height: 340px;
  padding: 12px;
  gap: 40px;
  background-color: #ffffff;
`;

export const ContainerSpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;
  width: 80%;
`;

export const ContainerCenteredTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const SubTitle = styled.h3`
  margin: 0;
  font-weight: 500;
  color: #556080;
  font-style: normal;
  font-weight: 600;
`;

export const InputCourse = styled.input<{ $width: string }>`
  height: 32px;
  width: ${(props) => props.$width};
  color: #3d3d3d;
  font-size: 14px;
  padding: 24px;
  border-radius: 4px;
  border: 1px solid #999191;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h2`
  margin: 0;
  color: #556080;
`;
