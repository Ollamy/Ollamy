import styled from 'styled-components';

const Button = ({ titleN }: { titleN: string }) => {
  return (
    <MyButton>
      <span>{titleN}</span>
    </MyButton>
  );
};

const MyButton = styled.button`
  width: 100px;
  height: 42px;
  border-radius: 4px;
  background: #646cff;
`;

export { Button };
