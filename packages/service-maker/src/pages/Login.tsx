/* eslint-disable import/no-extraneous-dependencies */
import { ButtonMaker } from '../components/button/button';
import { FormMaker } from '../components/form/form';
import { InputMaker } from '../components/input/input';
import { SideBarMaker } from '../components/sidebar/sidebar';

import image from '../assets/imageSideBar.png';

export function Login() {
  const onSubmit = (data: any) => console.log('oui');
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
          <InputMaker></InputMaker>
          <label htmlFor="password">Password</label>
          <InputMaker margin="0px 0px 20px 0px"></InputMaker>
          <ButtonMaker textButton="Login" onClick={onSubmit}></ButtonMaker>
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
