/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import image from '../assets/imageSideBar.png';
import { ButtonMaker } from '../components/button/button';
import { FormMaker } from '../components/form/form';
import { InputMaker } from '../components/input/input';
import { SideBarMaker } from '../components/sidebar/sidebar';

type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  rePassword: string;
};

enum State {
  PERSONALDATA,
  CONFIDENTIALDATA,
}

export function Register(): React.ReactNode {
  const [state, setState] = useState<State>(State.PERSONALDATA);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = async (data: Inputs): Promise<void> => {
    try {
      await axios.post(`http://localhost:3000/user`, {
        ...data,
      });
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
      }}
    >
      <SideBarMaker>
        <img alt="logo Ollamy" src={image} width="auto" height="auto" />
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
          Register
        </h1>
        {state === State.PERSONALDATA && (
          <>
            <label htmlFor="firstName">First name</label>
            <InputMaker register={{ ...register('firstName') }} />
            <label htmlFor="lastName">Last name</label>
            <InputMaker register={{ ...register('lastName') }} />
            <ButtonMaker textButton="Continue" onClick={() => setState(State.CONFIDENTIALDATA)} />
          </>
        )}
        {state === State.CONFIDENTIALDATA && (
          <>
            <label htmlFor="email">Email</label>
            <InputMaker register={{ ...register('email') }} />
            <label htmlFor="password">Password</label>
            <InputMaker type="password" register={{ ...register('password') }} />
            <label htmlFor="ConfirmPassword">Confirm Password</label>
            <InputMaker type="password" register={{ ...register('rePassword') }} />
            <ButtonMaker textButton="Register" onClick={handleSubmit(onSubmit)} />
          </>
        )}
        <p>
          Already have an account?
          <span style={{ color: '#876BF6', cursor: 'pointer' }} onClick={handleLoginClick}>
            Login
          </span>
        </p>
      </FormMaker>
    </div>
  );
}
