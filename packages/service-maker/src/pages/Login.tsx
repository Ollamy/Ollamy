// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';
import { useForm } from 'react-hook-form';

import { ButtonMaker } from '../components/button/button';
import { FormMaker } from '../components/form/form';
import { InputMaker } from '../components/input/input';
import { SideBarMaker } from '../components/sidebar/sidebar';

import image from '../assets/imageSideBar.png';

export function Login(): React.ReactNode {
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
      });
      console.log(createdUser.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRegisterClick = () => {
    window.location.href = 'register';
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
            Login
          </h1>
          <label htmlFor="email">Email</label>
          <InputMaker register={{ ...register('email') }}></InputMaker>
          <label htmlFor="password">Password</label>
          <InputMaker margin="0px 0px 20px 0px" register={{ ...register('password') }}></InputMaker>
          <ButtonMaker textButton="Login" onClick={handleSubmit(onSubmit)}></ButtonMaker>
          <p>
            Don't have an account?{' '}
            <span style={{ color: '#876BF6', cursor: 'pointer' }} onClick={handleRegisterClick}>
              Register
            </span>{' '}
          </p>
        </FormMaker>
      </div>
    </>
  );
}
