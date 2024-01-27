import { ReactElement, useState } from 'react';
import { useForm } from 'react-hook-form';
import api from 'src/services/api';
import { SideBarMaker } from 'src/components/sidebar/sidebar';
import { FormMaker } from 'src/components/form/form';
import InputMaker from 'src/components/input/input';
import { ButtonMaker } from 'src/components/button/button';

type Inputs = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  rePassword: string;
};

enum State {
  PERSONALDATA,
  CONFIDENTIALDATA,
}

const Register = (): ReactElement => {
  const [state, setState] = useState<State>(State.PERSONALDATA);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const { mutateAsync: registerMutation } = api.user.useRegister();

  const onSubmit = async (data: Inputs): Promise<void> => {
    try {
      const { firstname, lastname, email, password } = data;
      await registerMutation({
        createUserModel: { firstname, lastname, email, password },
      });
      window.location.href = '/home';
    } catch (err) {
      /* empty */
    }
  };
  const handleLoginClick = (): void => {
    window.location.href = 'login';
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
        <img alt={'logo Ollamy'} src={'assets/imageSideBar.png'} width={'auto'} height={'auto'} />
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
          Register
        </h1>
        {state === State.PERSONALDATA && (
          <>
            <label htmlFor="firstName">First name</label>
            <InputMaker register={{ ...register('firstname', { required: true }) }} />
            <label htmlFor="lastName">Last name</label>
            <InputMaker register={{ ...register('lastname', { required: true }) }} />
            <ButtonMaker textButton="Continue" onClick={() => setState(State.CONFIDENTIALDATA)} />
          </>
        )}
        {state === State.CONFIDENTIALDATA && (
          <>
            <label htmlFor="email">Email</label>
            <InputMaker register={{ ...register('email', { required: true }) }} />
            <label htmlFor="password">Password</label>
            <InputMaker type="password" register={{ ...register('password', { required: true }) }} />
            <label htmlFor="ConfirmPassword">Confirm Password</label>
            <InputMaker
              type="password"
              errorMessage={errors.rePassword && errors.rePassword.message}
              register={{
                ...register('rePassword', {
                  required: true,
                  validate: (val: string) => {
                    if (watch('password') !== val) {
                      return 'Your passwords do no match';
                    }
                  },
                }),
              }}
            />
            <ButtonMaker textButton="Register" onClick={handleSubmit(onSubmit)} />
          </>
        )}
        <p>
          Already have an account?{' '}
          <span style={{ color: '#876BF6', cursor: 'pointer' }} onClick={handleLoginClick}>
            Login
          </span>
        </p>
      </FormMaker>
    </div>
  );
};

export default Register;
