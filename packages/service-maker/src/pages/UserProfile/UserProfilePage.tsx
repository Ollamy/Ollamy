import styled from 'styled-components';
import UserSidePanel from 'pages/UserProfile/SidePanel/UserSidePanel';
import TopBar from 'components/TopBar/TopBar';
import UserGeneralSettings from 'pages/UserProfile/UserGeneralSettings/UserGeneralSettings';

// eslint-disable-next-line
interface UserProfilePageProps {}

const UserProfilePage = ({}: UserProfilePageProps) => {
  return (
    <Container>
      <TopBar isProfileDisplayed={false} />
      <Body>
        <UserSidePanel />
        <UserGeneralSettings />
      </Body>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100vh;

  background: #f1f3f6;
`;

const Body = styled.div`
  display: flex;

  flex-grow: 1;
  width: 100%;
  overflow: hidden;
`;

export default UserProfilePage;
