import styled from 'styled-components';

const HomeSidePanel = () => {
  return (
    <Container>
      <Header>
        <LogoOllamy src={'/assets/Ollamy.svg'} />
      </Header>
    </Container>
  );
};

const Container = styled.div`
  display: flex;

  width: 300px;
  height: 100%;

  background: #fbfaff;
  border: 1px solid rgba(233, 233, 233, 0.83);
`;

const Header = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  height: 100px;

  padding: 28px;
  box-sizing: border-box;
`;

const LogoOllamy = styled.img``;

export default HomeSidePanel;
