import { MaterialIcons } from '@expo/vector-icons';
// @ts-ignore
import BACKGROUND from 'assets/background-big.png';
// @ts-ignore
import KNOWLEDGE from 'assets/knowledge.png';
// @ts-ignore
import Ollamy from 'assets/Ollamy.png';
import type { AxiosError, AxiosResponse } from 'axios';
import { Box, Button, FormControl, Heading, HStack, Icon, Image, Input, Pressable, Text, VStack } from 'native-base';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import type { ToastShowParams } from 'react-native-toast-message';
import Toast from 'react-native-toast-message';
import { useNavigate } from 'react-router-dom';
import DotStepper from 'src/components/Stepper/DotStepper/DotStepper';
import useStepper from 'src/hooks/useStepper';
import { useRegisterMutation } from 'src/services/auth/auth';

interface RegisterPayload {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

interface RegisterForm extends RegisterPayload {
  confirmPassword: string;
}

const STEPS_NUMBER = 3;

enum RegisterSteps {
  WELCOME = 1,
  FIRSTNAME_LASTNAME,
  EMAIL_PASSWORD,
}

function Register(): JSX.Element {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterForm>();
  const [register, { isLoading }] = useRegisterMutation();

  const showToast = (body: ToastShowParams): void => Toast.show(body);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const { currentStep, goNext, goToStep } = useStepper(STEPS_NUMBER);

  const onSubmit = async (data: RegisterForm) => {
    try {
      await register({
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        password: data.password,
        platform: 'MOBILE',
      }).unwrap();
      showToast({
        type: 'success',
        text1: 'Success',
        text2: 'Your account has been created successfully',
      });
      navigate('/home');
    } catch (error) {
      console.log('error :', error);
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
    <KeyboardAwareScrollView extraScrollHeight={35}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <VStack h={'full'} w={'full'}>
          <Image source={BACKGROUND} alt={'background'} w={'full'} h={'200px'} resizeMode={'cover'} />
          <Box w={'full'} h={'full'} bg={'white'} opacity={0.97} borderRadius={8} p={'24px'}>
            <VStack w={'full'} space={'16px'}>
              <HStack alignItems={'center'} space={'md'} w={'full'}>
                <Image source={Ollamy} w={'72px'} h={'38px'} resizeMode={'contain'} alt={'ollamy'} />
                <Heading color={'#876BF6'} fontWeight={'bold'} fontSize={24}>
                  Ollamy
                </Heading>
              </HStack>

              <VStack w={'full'} justifyContent={'center'} space={6} alignItems={'center'} px={5}>
                {currentStep === RegisterSteps.WELCOME && (
                  <>
                    <Image source={KNOWLEDGE} w={'190px'} h={'160px'} resizeMode={'contain'} alt={'knowledge'} />
                    <Heading size={'xl'} fontWeight={'bold'} textAlign={'center'}>
                      Skills for Success: Learn Smart, Achieve Big!
                    </Heading>

                    <DotStepper currentStep={currentStep} stepsNumber={STEPS_NUMBER} goToStep={goToStep} />
                    <Button variant={'yellow'} onPress={goNext} w={'full'}>
                      GET STARTED
                    </Button>
                    <Button variant={'secondary'} onPress={() => navigate('/login')} w={'full'}>
                      I ALREADY HAVE AN ACCOUNT
                    </Button>
                  </>
                )}

                {currentStep === RegisterSteps.FIRSTNAME_LASTNAME && (
                  <>
                    <Controller
                      control={control}
                      name={'firstname'}
                      rules={{ required: true }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <FormControl isInvalid={!!errors.firstname}>
                          <Heading variant={'label'}>Firstname</Heading>
                          <Input
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            type={'text'}
                            placeholder={'Your firstname'}
                            InputRightElement={
                              <Icon as={<MaterialIcons name={'person'} />} size={5} mr={2} color={'muted.400'} />
                            }
                          />
                          {errors.firstname?.type === 'required' && (
                            <FormControl.ErrorMessage>This field is required</FormControl.ErrorMessage>
                          )}
                        </FormControl>
                      )}
                    />

                    <Controller
                      control={control}
                      name={'lastname'}
                      rules={{ required: true }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <FormControl isInvalid={!!errors.lastname}>
                          <Heading variant={'label'}>Lastname</Heading>
                          <Input
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            type={'text'}
                            placeholder={'Your lastname'}
                            InputRightElement={
                              <Icon as={<MaterialIcons name={'person'} />} size={5} mr={2} color={'muted.400'} />
                            }
                          />
                          {errors.lastname?.type === 'required' && (
                            <FormControl.ErrorMessage>This field is required</FormControl.ErrorMessage>
                          )}
                        </FormControl>
                      )}
                    />

                    <DotStepper currentStep={currentStep} stepsNumber={STEPS_NUMBER} goToStep={goToStep} />

                    <Button variant={'yellow'} onPress={goNext} w={'full'}>
                      NEXT
                    </Button>
                    <HStack alignItems={'center'} space={2}>
                      <Text fontSize={16} fontWeight={600}>
                        Already have an account ?
                      </Text>
                      <Text onPress={() => navigate('/login')} color={'#FF8D4D'} fontSize={16} fontWeight={600}>
                        Login
                      </Text>
                    </HStack>
                  </>
                )}

                {currentStep === RegisterSteps.EMAIL_PASSWORD && (
                  <>
                    <Controller
                      control={control}
                      name={'email'}
                      rules={{ required: true }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <FormControl isInvalid={!!errors.email}>
                          <Heading variant={'label'}>Email</Heading>
                          <Input
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            type={'text'}
                            placeholder={'Your email'}
                            InputRightElement={
                              <Icon
                                size={5}
                                mr={2}
                                color={'muted.400'}
                                as={<MaterialIcons name={'alternate-email'} />}
                              />
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
                      name={'password'}
                      rules={{ required: true }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <FormControl isInvalid={!!errors.password}>
                          <Heading variant={'label'}>Password</Heading>
                          <Input
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            type={showPassword ? 'text' : 'password'}
                            placeholder={'********'}
                            InputRightElement={
                              <Pressable onPress={() => setShowPassword(!showPassword)}>
                                <Icon
                                  as={<MaterialIcons name={showPassword ? 'visibility' : 'visibility-off'} />}
                                  size={5}
                                  mr={2}
                                  color={'muted.400'}
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

                    <Controller
                      control={control}
                      name={'confirmPassword'}
                      rules={{
                        required: true,
                        validate: (value, formValues) => value === formValues.password,
                      }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <FormControl isInvalid={!!errors.confirmPassword}>
                          <Heading variant={'label'}>Confirm password</Heading>
                          <Input
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder={'********'}
                            InputRightElement={
                              <Pressable onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                                <Icon
                                  as={<MaterialIcons name={showConfirmPassword ? 'visibility' : 'visibility-off'} />}
                                  size={5}
                                  mr={'2'}
                                  color={'muted.400'}
                                />
                              </Pressable>
                            }
                          />
                          {errors.confirmPassword?.type === 'required' && (
                            <FormControl.ErrorMessage>This field is required</FormControl.ErrorMessage>
                          )}
                          {errors.confirmPassword?.type === 'validate' && (
                            <FormControl.ErrorMessage>
                              The password confirmation does not match
                            </FormControl.ErrorMessage>
                          )}
                        </FormControl>
                      )}
                    />
                    <DotStepper currentStep={currentStep} stepsNumber={STEPS_NUMBER} goToStep={goToStep} />
                    <Button variant={'yellow'} isLoading={isLoading} onPress={handleSubmit(onSubmit)} w={'full'}>
                      CREATE ACCOUNT
                    </Button>

                    <HStack alignItems={'center'} space={2}>
                      <Text fontSize={16} fontWeight={600}>
                        Already have an account ?
                      </Text>
                      <Text onPress={() => navigate('/login')} color={'#FF8D4D'} fontSize={16} fontWeight={600}>
                        Login
                      </Text>
                    </HStack>
                  </>
                )}
              </VStack>
            </VStack>
          </Box>
        </VStack>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
}

export default Register;
