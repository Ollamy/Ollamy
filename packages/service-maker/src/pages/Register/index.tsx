import { ReactElement, useCallback, useState } from 'react';
import PageContainer from 'src/components/PageContainer';
import { useForm } from 'react-hook-form';
import api from 'src/services/api';
import { useNavigate } from 'react-router-dom';
import { SideBarMaker } from 'src/components/sidebar/sidebar';
import { FormMaker } from 'src/components/form/form';
import { Image, ImportantText, Label, Title, Text } from 'src/components/Connection';
import InputMaker from 'src/components/input/input';
import { ButtonMaker } from 'src/components/button/button';

// eslint-disable-next-line
interface RegisterProps {}

type Inputs = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmationPassword: string;
};

enum State {
  PERSONAL_DATA,
  CONFIDENTIAL_DATA,
}

const Register = ({}: RegisterProps): ReactElement => {
  const navigate = useNavigate();

  const [state, setState] = useState<State>(State.PERSONAL_DATA);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const { mutateAsync: registerMutation } = api.user.useRegister();

  const onSubmit = useCallback(
    async (data: Inputs): Promise<void> => {
      try {
        const { firstname, lastname, email, password } = data;
        await registerMutation({
          createUserModel: { firstname, lastname, email, password },
        });
        window.location.href = '/home';
      } catch (err) {
        /* empty */
      }
    },
    [registerMutation],
  );

  const handleLoginClick = useCallback(() => {
    navigate('/login');
  }, [navigate]);

  const handleClickContinue = useCallback(() => {
    setState(State.CONFIDENTIAL_DATA);
  }, []);

  return (
    <PageContainer>
      <SideBarMaker>
        <Image alt={'logo Ollamy'} src={'assets/imageSideBar.png'} />
      </SideBarMaker>
      <FormMaker>
        <Title>Register</Title>
        {state === State.PERSONAL_DATA && (
          <>
            <Label htmlFor={'firstName'}>First name</Label>
            <InputMaker register={{ ...register('firstname', { required: true }) }} />
            <Label htmlFor={'lastName'}>Last name</Label>
            <InputMaker register={{ ...register('lastname', { required: true }) }} />
            <ButtonMaker textButton={'Continue'} onClick={handleClickContinue} />
          </>
        )}
        {state === State.CONFIDENTIAL_DATA && (
          <>
            <Label htmlFor={'email'}>Email</Label>
            <InputMaker register={{ ...register('email', { required: true }) }} />
            <Label htmlFor={'password'}>Password</Label>
            <InputMaker type={'password'} register={{ ...register('password', { required: true }) }} />
            <Label htmlFor={'ConfirmPassword'}>Confirm Password</Label>
            <InputMaker
              type={'password'}
              errorMessage={errors.confirmationPassword && errors.confirmationPassword.message}
              register={{
                ...register('confirmationPassword', {
                  required: true,
                  validate: (val: string) => {
                    if (watch('password') !== val) {
                      return 'Your passwords do no match';
                    }
                  },
                }),
              }}
            />
            <ButtonMaker textButton={'Register'} onClick={handleSubmit(onSubmit)} />
          </>
        )}
        <Text>
          Already have an account? <ImportantText onClick={handleLoginClick}>Login</ImportantText>
        </Text>
      </FormMaker>
    </PageContainer>
  );
};

export default Register;
