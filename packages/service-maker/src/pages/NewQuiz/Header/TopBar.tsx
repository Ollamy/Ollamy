import { useParams } from 'react-router-dom';
import Path from 'components/TopBar/Path/Path';
import styled from 'styled-components';

// eslint-disable-next-line
interface TopBarProps {}

function TopBar({}: TopBarProps) {
  const urlParams = useParams();

  return (
    <Container>
      <ProfilContainer>N</ProfilContainer>
      <Path urlParams={urlParams} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;

  width: 100%;
  height: 60px;
  background: white;
  border: 1px solid #e7e7e7;

  padding: 0 20px;
  box-sizing: border-box;
`;

const ProfilContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 30px;
  height: 30px;
  border-radius: 2px;
  background: #d5cbff;

  padding: 5px;
  box-sizing: border-box;

  font-size: 14px;
`;

export default TopBar;
