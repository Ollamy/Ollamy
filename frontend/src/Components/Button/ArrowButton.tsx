import Image from 'next/image';
import styled from 'styled-components';
import arrowIcon from './../../../public/assets/arrow.svg';

export enum StyleColor {
  White = "WHITE",
  Purple = "PURPLE",
}

interface ArrowButtonProps {
  onClick: () => void
  buttonText: string
  styleColor?: StyleColor;
};

const ArrowButton = ({ onClick, buttonText, styleColor}: ArrowButtonProps) : JSX.Element => {
  return (
    <Container style={colorStyles[styleColor ?? 'WHITE']} onClick={onClick}>
      <TextContainer>
        {buttonText}
      </TextContainer>
      <Image src={arrowIcon} alt={""} style={{height: "100%", alignSelf: 'end'}}/>
    </Container>
  )
}

type colorStylesType = {
  [key in StyleColor]: {};
};

const colorStyles: colorStylesType = {
  WHITE:
    {
      background: 'white',
      border: '2px solid #BDBDBD',
      color: '#847A7A',
    },
  PURPLE:
    {
      background: '#876BF6',
      color: 'white',
    }
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 13px 26px;
  border-radius: 12px;
`;

const TextContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

export default ArrowButton;