import styled from 'styled-components';

export const NavLeftContainer = styled.div`
  display: flex;
  align-self: flex-start;
  flex-direction: column;
  width: 400px;
  background-color: #ffffff;
  flex: 1;

  justify-content: flex-start;
  align-items: center;
`;

export const NavLeftContainerNameProps = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  flex: 1;
  width: 100%;
  padding: 24px;
  gap: 30px;
  border-bottom: 1px solid #b9a8a8;
`;

export const NavLeftContainerPercentageProps = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  flex: 1;
  width: 100%;
  gap: 30px;
  padding: 24px;
  border-bottom: 1px solid #b9a8a8;
`;

export const NavLeftContainerNavigationProps = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  flex: 3;
  width: 100%;
  padding: 10px;
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

export const StatusBar = styled.div`
  display: flex;
  width: 90%;
  height: 30px;
  border-radius: 34px;
  background-color: #d9d9d9;

  position: relative;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 45%;
    height: 100%;
    background-color: #e69c8e;
    border-radius: 34px;
  }
`;

export const NavOption = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-top: 50px;
  padding: 12px;
  width: 75%;
  gap: 60px;
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
