import { MaterialIcons } from '@expo/vector-icons';
import type { AxiosError, AxiosResponse } from 'axios';
import { Button, FormControl, Heading, HStack, Icon, Input, Pressable, ScrollView, Text, VStack } from 'native-base';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { SafeAreaView } from 'react-native';
import type { ToastShowParams } from 'react-native-toast-message';
import Toast from 'react-native-toast-message';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from 'src/services/auth/auth';

interface LoginForm {
  email: string;
  password: string;
}

function Login(): JSX.Element {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginForm>();
  const [login, { isLoading }] = useLoginMutation();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const showToast = (body: ToastShowParams): void => Toast.show(body);

  const onSubmit = async (data: LoginForm) => {
    try {
      await login({
        email: data.email,
        password: data.password,
      }).unwrap();
      showToast({
        type: 'success',
        text1: 'Success',
        text2: 'You have successfully logged in',
      });
      navigate('/home');
    } catch (error) {
      showToast({
        type: 'error',
        text1:
          (
            (error as AxiosError).response as AxiosResponse<{
              message: string;
              error: string;
              statusCode: number;
            }>
          )?.data.error ?? 'Something went wrong',
        text2: [
          (
            (error as AxiosError).response as AxiosResponse<{
              message: string;
              error: string;
              statusCode: number;
            }>
          ).data.message,
        ]
          .flat()
          .join('\n'),
      });
    }
  };

  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{ justifyContent: 'center', display: 'flex', flexDirection: 'column', height: '100%' }}
      >
        <VStack flex="1" justifyContent="center" space={6} alignItems="center" px={5}>
          <Heading color="#F67E68" mb={4}>
            Login
          </Heading>

          <Controller
            control={control}
            name="email"
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormControl isInvalid={!!errors.email}>
                <Input
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  type="text"
                  placeholder="Email"
                  InputRightElement={
                    <Icon size={5} mr={2} color="muted.400" as={<MaterialIcons name="alternate-email" />} />
                  }
                />
                {errors.email?.type === 'required' && (
                  <FormControl.ErrorMessage>This field is required</FormControl.ErrorMessage>
                )}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="password"
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormControl isInvalid={!!errors.password}>
                <Input
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  InputRightElement={
                    <Pressable onPress={() => setShowPassword(!showPassword)}>
                      <Icon
                        as={<MaterialIcons name={showPassword ? 'visibility' : 'visibility-off'} />}
                        size={5}
                        mr={2}
                        color="muted.400"
                      />
                    </Pressable>
                  }
                />
                {errors.password?.type === 'required' && (
                  <FormControl.ErrorMessage>This field is required</FormControl.ErrorMessage>
                )}
              </FormControl>
            )}
          />
          <Button
            isLoading={isLoading}
            onPress={handleSubmit(onSubmit)}
            w="full"
            rightIcon={<MaterialIcons name="login" size={24} color="white" />}
          >
            Log in
          </Button>

          <HStack alignItems="center" space={2}>
            <Text fontSize={16} fontWeight={600}>
              Don't have an account ?
            </Text>
            <Text onPress={() => navigate('/register')} color="#FF8D4D" fontSize={16} fontWeight={600}>
              Register
            </Text>
          </HStack>
          <Toast />
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Login;
