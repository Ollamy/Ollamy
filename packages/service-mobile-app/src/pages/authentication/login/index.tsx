import { MaterialIcons } from '@expo/vector-icons';
// @ts-ignore
import BACKGROUND from 'assets/background.png';
// @ts-ignore
import Ollamy from 'assets/Ollamy.png';
import type { AxiosError, AxiosResponse } from 'axios';
import {
  Box,
  Button,
  FormControl,
  Heading,
  HStack,
  Icon,
  Image,
  Input,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { SafeAreaView } from 'react-native';
import type { ToastShowParams } from 'react-native-toast-message';
import Toast from 'react-native-toast-message';
import { useNavigate } from 'react-router-dom';
import DotStepper from 'src/components/Stepper/DotStepper/DotStepper';
import { useLoginMutation } from 'src/services/auth/auth';

interface RegisterPayload {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

interface RegisterForm extends RegisterPayload {
  confirmPassword: string;
}

function Login(): JSX.Element {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterForm>();
  const [login, { isLoading }] = useLoginMutation();

  const showToast = (body: ToastShowParams): void => Toast.show(body);

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const onSubmit = async (data: RegisterForm) => {
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
            (error as AxiosError)?.response as AxiosResponse<{
              message: string;
              error: string;
              statusCode: number;
            }>
          )?.data.error ?? 'Something went wrong',
        text2: [
          (
            (error as AxiosError)?.response as AxiosResponse<{
              message: string;
              error: string;
              statusCode: number;
            }>
          )?.data.message ?? '',
        ]
          .flat()
          .join('\n'),
      });
    }
  };

  return (
    <SafeAreaView>
      <Image source={BACKGROUND} position="absolute" />
      <Box w="100%" h="100%" paddingX={4} paddingY={16}>
        <Box w="full" h="full" bg="white" opacity={0.97} borderRadius={8} p="24px">
          <VStack w="full">
            <HStack alignItems="center" space="md" w="full">
              <Image source={Ollamy} w="72px" h="38px" resizeMode="contain" />
              <Heading color="#758EE9" fontWeight="bold" fontSize={24}>
                Ollamy
              </Heading>
            </HStack>
            <ScrollView
              contentContainerStyle={{
                justifyContent: 'center',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
              }}
            >
              <VStack flex="1" justifyContent="center" space={6} alignItems="center" px={5}>
                <Controller
                  control={control}
                  name="email"
                  rules={{ required: true }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <FormControl isInvalid={!!errors.email}>
                      <Heading variant="label">Email</Heading>
                      <Input
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        type="text"
                        placeholder="Your email"
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
                      <Heading variant="label">Password</Heading>
                      <Input
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        type={showPassword ? 'text' : 'password'}
                        placeholder="********"
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
                <DotStepper currentStep={3} stepsNumber={3} goToStep={() => {}} />
                <Button variant="yellow" isLoading={isLoading} onPress={handleSubmit(onSubmit)} w="full">
                  LOG IN
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
          </VStack>
        </Box>
      </Box>
    </SafeAreaView>
  );
}

export default Login;
