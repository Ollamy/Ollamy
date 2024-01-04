import styled from "styled-components";

export const RightContainerSetting = styled.div<{
  $width: string;
  $height: string;
}>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: ${(props) => props.$width};
  border-radius: 8px;
  height: ${(props) => props.$height};
  margin: 24px;
  padding: 12px;
  gap: 40px;
  background-color: #ffffff;
`;

export const NewCourseButton = styled.button`
  width: 80%;
  height: 60px;
  background-color: #e69c8e;
  border: none;
  cursor: pointer;
  text-decoration: none;
  border-radius: 34px;
  color: white;
  font-weight: 600;
  font-size: 18px;
  &:hover {
    background-color: #e8c1b9;
  }
`;

export const UploadPictureButton = styled(NewCourseButton)`
  height: 3rem;
  border: 1px solid rgba(0, 0, 0, 0.4);
  border-radius: 0.5rem;
  color: rgba(138, 110, 252, 0.67);
  background: #fff;
`;

export const Title = styled.h2`
  margin: 0;
  color: #556080;
`;
