import { MaterialIcons } from '@expo/vector-icons';
import type { AxiosError, AxiosResponse } from 'axios';
import { Button, FormControl, Heading, HStack, Icon, Input, Pressable, ScrollView, Text, VStack } from 'native-base';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { SafeAreaView } from 'react-native';
import type { ToastShowParams } from 'react-native-toast-message';
import Toast from 'react-native-toast-message';
import { useNavigate } from 'react-router-dom';
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

  const onSubmit = async (data: RegisterForm) => {
    try {
      await register({
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        password: data.password,
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
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{ justifyContent: 'center', display: 'flex', flexDirection: 'column', height: '100%' }}
      >
        <VStack flex="1" justifyContent="center" space={6} alignItems="center" px={5}>
          <Heading color="#F67E68" mb={4}>
            Register
          </Heading>
          <Controller
            control={control}
            name="firstname"
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormControl isInvalid={!!errors.firstname}>
                <Input
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  type="text"
                  placeholder="Firstname"
                  InputRightElement={
                    <Pressable onPress={() => setShowPassword(!showPassword)}>
                      <Icon as={<MaterialIcons name="person" />} size={5} mr={2} color="muted.400" />
                    </Pressable>
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
            name="lastname"
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormControl isInvalid={!!errors.lastname}>
                <Input
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  type="text"
                  placeholder="Lastname"
                  InputRightElement={
                    <Pressable onPress={() => setShowPassword(!showPassword)}>
                      <Icon as={<MaterialIcons name="person" />} size={5} mr={2} color="muted.400" />
                    </Pressable>
                  }
                />
                {errors.lastname?.type === 'required' && (
                  <FormControl.ErrorMessage>This field is required</FormControl.ErrorMessage>
                )}
              </FormControl>
            )}
          />

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
          <Controller
            control={control}
            name="confirmPassword"
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormControl isInvalid={!!errors.confirmPassword}>
                <Input
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm password"
                  InputRightElement={
                    <Pressable onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                      <Icon
                        as={<MaterialIcons name={showConfirmPassword ? 'visibility' : 'visibility-off'} />}
                        size={5}
                        mr="2"
                        color="muted.400"
                      />
                    </Pressable>
                  }
                />
                {errors.confirmPassword?.type === 'required' && (
                  <FormControl.ErrorMessage>This field is required</FormControl.ErrorMessage>
                )}
                {errors.confirmPassword?.type === 'different' && (
                  <FormControl.ErrorMessage>The password confirmation does not match</FormControl.ErrorMessage>
                )}
              </FormControl>
            )}
          />
          <Button
            isLoading={isLoading}
            onPress={handleSubmit(onSubmit)}
            w="full"
            rightIcon={<MaterialIcons name="lock-outline" size={24} color="white" />}
          >
            Create account
          </Button>

          <HStack alignItems="center" space={2}>
            <Text fontSize={16} fontWeight={600}>
              Already have an account ?
            </Text>
            <Text onPress={() => navigate('/login')} color="#FF8D4D" fontSize={16} fontWeight={600}>
              Log in
            </Text>
          </HStack>
          <Toast />
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Register;
