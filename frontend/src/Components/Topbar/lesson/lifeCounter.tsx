import Image from 'next/image';
import styled from 'styled-components';
import heartIcon from './../../../../public/assets/Topbar/heart.svg';

interface LifeCounterProps {
  lifeCount: number
};

const LifeCounter = ({lifeCount}: LifeCounterProps): JSX.Element => {
  return (
    <LifeContainer>
      <LifeText>
        {String(lifeCount).padStart(2, '0')}
      </LifeText>
      <Image src={heartIcon} alt={""} style={{height: "100%"}}/>
    </LifeContainer>
  )
}

const LifeText = styled.div`
  color: #3D3D3D;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 30px;
`

const LifeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  border-radius: 8px;
  padding: 5px 5px;
  gap: 5px;
  box-shadow: 0px 0px 12px 4px rgba(189, 189, 189, 0.25);
`;

export default LifeCounter;