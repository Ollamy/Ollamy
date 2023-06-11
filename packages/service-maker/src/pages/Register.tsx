/* eslint-disable import/no-extraneous-dependencies */
import { useForm } from 'react-hook-form';
import axios from 'axios';

import { SideBarMaker } from '../components/sidebar/sidebar';
import { InputMaker } from '../components/input/input';
import { FormMaker } from '../components/form/form';
import { ButtonMaker } from '../components/button/button';

import image from '../assets/imageSideBar.png';

export function Register(): React.ReactNode {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const createdUser = await axios.post(`http://localhost:3000/user`, {
        ...data,
        firstName: 'toni',
        lastName: 'da rodda',
      });
      console.log(createdUser.data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleLoginClick = () => {
    window.location.href = 'login';
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          width: '100vw',
          height: '100vh',
          flexDirection: 'row',
        }}
      >
        <SideBarMaker>
          <img src={image} width="auto" height="auto" />
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
          <label htmlFor="email">Email</label>
          <InputMaker register={{ ...register('email') }}></InputMaker>
          <label htmlFor="password">Password</label>
          <InputMaker register={{ ...register('password') }}></InputMaker>
          <label htmlFor="ConfirmPassword">Confirm Password</label>
          <InputMaker register={{ ...register('rePassword') }}></InputMaker>
          <ButtonMaker textButton="Register" onClick={handleSubmit(onSubmit)}></ButtonMaker>
          <p>
            Already have an account?{' '}
            <span style={{ color: '#876BF6', cursor: 'pointer' }} onClick={handleLoginClick}>
              Login
            </span>{' '}
          </p>
        </FormMaker>
      </div>
    </>
  );
}
