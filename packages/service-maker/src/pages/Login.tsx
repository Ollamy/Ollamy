import { ReactElement } from 'react';
import { useForm } from 'react-hook-form';

import api from 'src/services/api';
import { ButtonMaker } from 'src/components/button/button';
import { FormMaker } from 'src/components/form/form';
import { SideBarMaker } from 'src/components/sidebar/sidebar';
import InputMaker from 'src/components/input/input';

type Inputs = {
  email: string;
  password: string;
};

const Login = (): ReactElement => {
  const { register, handleSubmit } = useForm<Inputs>();
  const { mutateAsync: loginMutation } = api.user.useLogin();

  const onSubmit = async (data: Inputs) => {
    try {
      await loginMutation({ loginUserModel: data });
      window.location.href = '/home';
    } catch (err) {
      // pop up error
    }
  };

  const handleRegisterClick = () => {
    window.location.href = 'register';
  };

  return (
    <div
      style={{
        display: 'flex',
        width: '100vw',
        height: '100vh',
        flexDirection: 'row',
      }}>
      <SideBarMaker>
        <img alt="ollamy logo" src={'assets/imageSideBar.png'} width="auto" height="auto" />
      </SideBarMaker>
      <FormMaker>
        <h1
          style={{
            color: '#E6674F',
            marginTop: '140px',
            marginBottom: '60px',
            fontWeight: 'bolder',
            fontSize: '40px',
          }}>
          Login
        </h1>
        <label htmlFor="email">Email</label>
        <InputMaker register={{ ...register('email') }} />
        <label htmlFor="password">Password</label>
        <InputMaker type="password" margin="0 0 20px 0" register={{ ...register('password') }} />
        <ButtonMaker textButton="Login" onClick={handleSubmit(onSubmit)} />
        <p>
          Don't have an account?{' '}
          <span style={{ color: '#876BF6', cursor: 'pointer' }} onClick={handleRegisterClick}>
            Register
          </span>
        </p>
      </FormMaker>
    </div>
  );
};

export default Login;
