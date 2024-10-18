import styled from 'styled-components';

export const RightContainerSetting = styled.div<{ width: string }>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: ${(props) => props.width};
  border-radius: 8px;
  height: 340px;
  margin: 24px;
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

export const SubTitle = styled.h3`
  margin: 0;
  font-weight: 500;
  color: #556080;
  font-style: normal;
  font-weight: 600;
`;

export const InputCourse = styled.input<{ width: string }>`
  height: 32px;
  width: ${(props) => props.width};
  color: #3d3d3d;
  font-size: 14px;
  padding: 24px;
  border-radius: 4px;
  border: 1px solid #999191;
`;

export const Title = styled.h2`
  margin: 0;
  color: #556080;
`;
