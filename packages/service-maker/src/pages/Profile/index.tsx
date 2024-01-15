import { ReactElement, useCallback, useState, ChangeEvent } from 'react';
import TopBar from '../../components/TopBar';
import styled from 'styled-components';

interface ProfilePageProps {}

const ProfilePage = ({}: ProfilePageProps): ReactElement => {
  const [editMode, setEditMode] = useState(false);

  const [email, setEmail] = useState('nicolas.heude@epitech.eu');
  const [birthDate, setBirthDate] = useState('2002-07-25');

  const handleClickRemoveAccount = useCallback(() => {
    alert('Are you sure you want to remove your account ?');
  }, []);

  const handleClickEditMode = useCallback(() => {
    setEditMode((old) => !old);
  }, []);

  const changeBirthDate = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setBirthDate(e.target.value);
  }, []);

  const changeEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, []);

  return (
    <Container>
      <TopBar title={'Profile'} profilePictureDisplayed={false}>
        <LogoutButton href={'/'}>Logout</LogoutButton>
      </TopBar>
      <Body>
        <BoxContainer>
          <Title>Nicolas HEUDE</Title>
          <SubTitle>@nheude</SubTitle>
          <Text style={{ marginTop: '8px' }}>🕓 Membre depuis novembre 2016</Text>
        </BoxContainer>
        <BoxContainer>
          <SubTitle>Email</SubTitle>
          {editMode ? (
            <Input type={'email'} value={email} onChange={changeEmail} />
          ) : (
            <Text style={{ marginTop: '-4px' }}>{email}</Text>
          )}
          <SubTitle>Date de naissance</SubTitle>
          {editMode ? (
            <Input type={'date'} value={birthDate} onChange={changeBirthDate} />
          ) : (
            <Text style={{ marginTop: '-4px' }}>{birthDate.split('-').reverse().join(' / ')}</Text>
          )}
        </BoxContainer>
        <BoxContainer>
          <SubTitle>Account</SubTitle>
          <RemoveButton style={{ background: editMode ? '#2ECC71' : '#85C1E9' }} onClick={handleClickEditMode}>
            {editMode ? 'Done' : 'Modify your information'}
          </RemoveButton>
          <RemoveButton onClick={handleClickRemoveAccount}>Remove your account</RemoveButton>
        </BoxContainer>
      </Body>
    </Container>
  );
};

const Body = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  gap: 24px;

  width: 100%;
`;

const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;

  gap: 12px;

  width: 512px;

  padding: 24px;
  box-sizing: border-box;

  border-bottom: 2px solid #e0e0e0;
`;

const Title = styled.h2`
  margin: 0;
  color: #3d3d3d;
`;

const SubTitle = styled.h4`
  margin: 0;
  font-weight: 500;
  color: #7c7c7c;
`;

const Text = styled.p`
  color: #3d3d3d;
  font-weight: 400;
  margin: 0;
`;

const Input = styled.input`
  height: 32px;
  color: #3d3d3d;
  font-size: 14px;
`;

const Container = styled.div`
  display: block;

  width: 100%;
  height: 100%;
`;

const LogoutButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 12px;

  height: 80%;
  padding: 0 12px;
  box-sizing: border-box;

  color: white;
  border-radius: 4px;
  background: #e74c3c;

  border: none;
  cursor: pointer;
  text-decoration: none;
`;

const RemoveButton = styled(LogoutButton)`
  height: 42px;
  width: 100%;

  font-size: 16px;
`;

export default ProfilePage;
