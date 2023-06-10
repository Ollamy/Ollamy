import { SideBarMaker } from '../components/sidebar/sidebar';
import { InputMaker } from '../components/input/input';
import { FormMaker } from '../components/form/form';
import { ButtonMaker } from '../components/button/button';

import image from '../assets/imageSideBar.png';

export function Register(): React.ReactNode {
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
          <InputMaker></InputMaker>
          <label htmlFor="password">Password</label>
          <InputMaker></InputMaker>
          <label htmlFor="ConfirmPassword">Confirm Password</label>
          <InputMaker></InputMaker>
          <ButtonMaker textButton="Register"></ButtonMaker>
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
