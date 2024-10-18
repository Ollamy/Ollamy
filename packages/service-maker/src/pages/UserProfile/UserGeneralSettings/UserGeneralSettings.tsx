import { useCallback } from 'react';
import CustomDialogTitleDescription from 'components/RadixUi/Dialog/CustomDialogTitleDescription';
import { userActions } from 'services/api/routes/user';
import styled from 'styled-components';

import { Badge, Button, Separator } from '@radix-ui/themes';
import api from 'services/api';
import { ImportedMeta } from 'env';

// eslint-disable-next-line
interface UserGeneralSettingsProps {}

export function capitalizeFirstLetterOfEachWord(data: string) {
  return data
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function UserGeneralSettings({}: UserGeneralSettingsProps) {
  const { data } = userActions.useGetUser();
  const { mutateAsync: updateUser } = userActions.useUpdateUser();
  const buildRes = api.mobileApp.useLastMobileBuild();

  const handleChangeName = useCallback(
    async (title: string, description: string) => {
      await updateUser({
        updateUserModel: { firstname: title, lastname: description },
      });
    },
    [updateUser],
  );

  const handleChangePassword = useCallback(
    async (title: string) => {
      await updateUser({
        updateUserModel: { password: title },
      });
    },
    [updateUser],
  );

  const downloadLastBuild = () => {
    if (buildRes.status === 'success')
      window.location.href = `${ImportedMeta.env.VITE_PUBLIC_BACKEND_URL}/${buildRes.data.url}`;
  };

  return data ? (
    <Container>
      <Header>
        <Title>Your settings</Title>
        <Description>Edit your login details, and set preferences</Description>
      </Header>
      <Body>
        <NameContainer>
          <SubContainer>
            <Avatar>{data.firstname[0].toUpperCase()}</Avatar>
            <Item>
              {capitalizeFirstLetterOfEachWord(data.firstname)}{' '}
              {capitalizeFirstLetterOfEachWord(data.lastname)}
            </Item>
          </SubContainer>
          <CustomDialogTitleDescription
            secondFieldType={'input'}
            defaultTitleLabel={'First name'}
            defaultDescriptionLabel={'Last name'}
            dialogTitle={'Change name'}
            dialogDescription={'Edit your first and last name of your account.'}
            defaultTitle={capitalizeFirstLetterOfEachWord(data.firstname)}
            defaultDescription={capitalizeFirstLetterOfEachWord(data.lastname)}
            actionButtonValue={'Update'}
            TriggerButton={
              <Button
                size={'2'}
                color={'orange'}
                variant={'soft'}
                style={{ marginLeft: '30px' }}
              >
                Change name
              </Button>
            }
            createFunction={handleChangeName}
          />
        </NameContainer>
        <NameContainer>
          <SubContainer>
            <Badge color={'blue'}>Email</Badge>
            <Item>{data.email}</Item>
          </SubContainer>
        </NameContainer>
        <Separator size={'4'} />
        <NameContainer>
          <SubContainer>
            <Badge color={'red'}>Password</Badge>
            <Item>************</Item>
          </SubContainer>
          <CustomDialogTitleDescription
            secondFieldType={'none'}
            defaultTitleLabel={'New password'}
            dialogTitle={'Change password'}
            dialogDescription={'Be careful when changing your password'}
            actionButtonValue={'Change password'}
            TriggerButton={
              <Button
                size={'2'}
                color={'red'}
                variant={'soft'}
                style={{ marginLeft: '30px' }}
              >
                Change password
              </Button>
            }
            createFunction={handleChangePassword}
          />
        </NameContainer>
        <span
          style={{ color: '#876BF6', cursor: 'pointer', alignSelf: 'center' }}
          onClick={downloadLastBuild}
        >
          Download mobile app
        </span>
      </Body>
    </Container>
  ) : null;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;

  align-items: center;
`;

const Header = styled.div`
  padding: 20px 0;

  width: 592px;
`;

const Title = styled.h3`
  margin: 0;
`;

const Description = styled.p`
  margin: 0;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;

  background: white;
  width: 592px;
  padding: 24px;
  gap: 12px;

  border-radius: 8px;
  box-shadow: rgba(149, 157, 165, 0.2) 0 8px 24px;
`;

const NameContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const SubContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Avatar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  color: white;
  font-weight: 800;

  width: 40px;
  height: 40px;
  border-radius: 100%;
  background: #af7ac5;
`;

const Item = styled.p`
  margin: 0;
`;

export default UserGeneralSettings;
