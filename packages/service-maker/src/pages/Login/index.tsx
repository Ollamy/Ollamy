import { useForm } from 'react-hook-form';
import { ReactElement, useCallback } from 'react';
import { SideBarMaker } from 'src/components/sidebar/sidebar';
import { FormMaker } from 'src/components/form/form';
import InputMaker from 'src/components/input/input';
import { ButtonMaker } from 'src/components/button/button';
import api from 'src/services/api';
import { useNavigate } from 'react-router-dom';
import PageContainer from 'src/components/PageContainer';
import { Title, Image, Label, ImportantText, Text } from 'src/components/Connection';

// eslint-disable-next-line
interface LoginPageProps {}

type Inputs = {
  email: string;
  password: string;
};

const Login = ({}: LoginPageProps): ReactElement => {
  const { register, handleSubmit } = useForm<Inputs>();
  const { mutateAsync: loginMutation } = api.user.useLogin();
  const navigate = useNavigate();

  const onSubmit = useCallback(
    async (data: Inputs) => {
      try {
        await loginMutation({ loginUserModel: data });
        window.location.href = '/home';
      } catch (err) {
        // pop up error
      }
    },
    [loginMutation],
  );

  const handleRegisterClick = useCallback(() => {
    navigate('/register');
  }, [navigate]);

  return (
    <PageContainer>
      <SideBarMaker>
        <Image alt={'ollamy logo'} src={'assets/imageSideBar.png'} />
      </SideBarMaker>
      <FormMaker>
        <Title>Login</Title>
        <Label htmlFor={'email'}>Email</Label>
        <InputMaker register={{ ...register('email') }} />
        <Label htmlFor={'password'}>Password</Label>
        <InputMaker type={'password'} margin={'0 0 20px 0'} register={{ ...register('password') }} />
        <ButtonMaker textButton={'Login'} onClick={handleSubmit(onSubmit)} />
        <Text>
          Don't have an account? <ImportantText onClick={handleRegisterClick}>Register</ImportantText>
        </Text>
      </FormMaker>
    </PageContainer>
  );
};

export default Login;
