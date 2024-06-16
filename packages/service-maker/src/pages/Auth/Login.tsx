import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { userActions } from 'services/api/routes/user';
import { styled } from 'styled-components';

interface IFormInputs {
  email: string;
  password: string;
}

export function Login() {
  const navigate = useNavigate();
  const { data } = userActions.useGetUser();
  const { mutateAsync: loginMutation } = userActions.useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>();

  const onSubmit = useCallback(
    (values: IFormInputs) => {
      loginMutation({ loginUserModel: values }).then(() => {
        navigate('/home');
      });
    },
    [loginMutation, navigate],
  );

  useEffect(() => {
    if (data) {
      navigate('/home');
    }
  }, [data, navigate]);

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Title>Login</Title>
        <InputContainer>
          <Label htmlFor={'email'}>Email</Label>
          <Input
            id={'email'}
            {...register('email', {
              required: 'Required',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: 'Invalid email address',
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </InputContainer>
        <InputContainer>
          <Label htmlFor={'password'}>Password</Label>
          <Input
            id={'password'}
            type={'password'}
            {...register('password', {
              required: 'Required',
              minLength: {
                value: 1,
                message: 'Password must be at least 1 characters',
              },
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </InputContainer>
        <Button type={'submit'}>Login</Button>
        <RegisterLink>
          {"Don't have an account?"} <a href={'/register'}>Register</a>
        </RegisterLink>
      </Form>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url('/assets/background.svg');
`;

const Form = styled.form`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: center;
`;

const Title = styled.h1`
  margin-bottom: 1rem;
  color: #333;
`;

const InputContainer = styled.div`
  margin-bottom: 1rem;
  text-align: left;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #555;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 0.5rem;
  &:focus {
    border-color: #007bff;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 0.5rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background: #f0a500;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  &:hover {
    background: #d38b00;
  }
`;

const RegisterLink = styled.div`
  margin-top: 1rem;
  color: #555;
  a {
    color: #007bff;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;
