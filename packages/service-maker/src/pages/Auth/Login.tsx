import { useForm } from 'react-hook-form';
import { ButtonMaker } from 'components/button/button';
import { FormMaker } from 'components/form/form';
import { InputMaker } from 'components/input/input';
import { SideBarMaker } from 'components/sidebar/sidebar';
import api from 'services/api';

type Inputs = {
  email: string;
  password: string;
};

export function Login() {
  const { register, handleSubmit } = useForm<Inputs>();
  const { mutateAsync: loginMutation } = api.user.useLogin();
  const buildRes = api.mobileApp.useLastMobileBuild();

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

  const downloadLastBuild = () => {
    if (buildRes.status === 'success') window.location.href = buildRes.data.url;
  };

  return (
    <div
      style={{
        display: 'flex',
        width: '100vw',
        height: '100vh',
        flexDirection: 'row',
      }}
    >
      <SideBarMaker>
        <img
          alt={'ollamy logo'}
          src={'/assets/imageSideBar.png'}
          width={'auto'}
          height={'auto'}
        />
      </SideBarMaker>
      <FormMaker>
        <h1
          style={{
            color: '#E6674F',
            marginTop: '140px',
            marginBottom: '60px',
            fontWeight: 'bolder',
            fontSize: '40px',
          }}
        >
          Login
        </h1>
        <label htmlFor={'email'}>Email</label>
        <InputMaker register={{ ...register('email') }} padding={'20px'} />
        <label htmlFor={'password'}>Password</label>
        <InputMaker
          type={'password'}
          padding={'20px'}
          margin={'0px 0px 20px 0px'}
          register={{ ...register('password') }}
        />
        <ButtonMaker textButton={'Login'} onClick={handleSubmit(onSubmit)} />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <p>
            Don't have an account?{' '}
            <span
              style={{ color: '#876BF6', cursor: 'pointer' }}
              onClick={handleRegisterClick}
            >
              Register
            </span>
          </p>
          <span
            style={{ color: '#876BF6', cursor: 'pointer', alignSelf: 'center' }}
            onClick={downloadLastBuild}
          >
            Download mobile app
          </span>
        </div>
      </FormMaker>
    </div>
  );
}
