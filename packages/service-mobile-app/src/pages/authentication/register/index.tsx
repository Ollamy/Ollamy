import { FormControl } from 'native-base';
import { Controller, useForm } from 'react-hook-form';
import { TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigate } from 'react-router-dom';
import Toast, { ToastShowParams } from 'react-native-toast-message';
import backendApi from '../../../client';
import { AxiosError, AxiosResponse } from 'axios';

interface RegisterPayload {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

interface RegisterForm extends RegisterPayload {
  confirmPassword: string;
}

const Register = () => {
  const insets = useSafeAreaInsets();
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterForm>();

  const showToast = (body: ToastShowParams) => Toast.show(body);

  const onSubmit = async (data: RegisterForm) => {
    try {
      const response = await backendApi.post('/user/register', {
        firstname: 'alex',
        lastname: 'alex',
        email: data.email,
        password: data.password,
      });
      showToast({
        type: 'success',
        topOffset: 92,
        text1: 'Success',
        text2: 'Your account has been created successfully',
      });
    } catch (error) {
      showToast({
        type: 'error',
        topOffset: 92,
        text1:
          ((error as AxiosError).response as AxiosResponse<{ message: string; error: string; statusCode: number }>)
            ?.data.error ?? 'Something went wrong',
        text2: [
          ((error as AxiosError).response as AxiosResponse<{ message: string; error: string; statusCode: number }>).data
            .message,
        ]
          .flat()
          .join('\n'),
      });
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        gap: 24,
        alignItems: 'center',
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left + 20,
        paddingRight: insets.right + 20,
      }}
    >
      <Text style={{ ...styles.highlightText, fontSize: 24 }}>Register</Text>
      <Controller
        control={control}
        name="email"
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <FormControl isInvalid={!!errors.email}>
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              inputMode="email"
              style={styles.input}
              placeholder="Email"
            ></TextInput>
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
            <TextInput
              secureTextEntry
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              inputMode="text"
              style={styles.input}
              placeholder="Password"
            ></TextInput>
            {errors.password?.type === 'required' && (
              <FormControl.ErrorMessage>{errors.password.message}</FormControl.ErrorMessage>
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
            <TextInput
              secureTextEntry
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              inputMode="text"
              style={styles.input}
              placeholder="Confirm password"
            ></TextInput>
            {errors.confirmPassword?.type === 'required' && (
              <FormControl.ErrorMessage>This field is required</FormControl.ErrorMessage>
            )}
            {errors.confirmPassword?.type === 'different' && (
              <FormControl.ErrorMessage>The password confirmation does not match</FormControl.ErrorMessage>
            )}
          </FormControl>
        )}
      />
      <View style={styles.horizontalContainer}>
        <Text style={styles.text}>Already have an account ?</Text>
        <Text onPress={() => navigate('login')} style={styles.highlightText}>
          Log in
        </Text>
      </View>
      <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.button}>
        <Text style={styles.buttonText}>Create account</Text>
      </TouchableOpacity>
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 56,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F7F7F7',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#C7C7C7',
    fontSize: 16,
    fontWeight: '600',
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 56,
    backgroundColor: '#F67E68',
    borderColor: '#D15842',
    borderTopWidth: 0,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 4,
    borderRadius: 16,
  },
  text: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
  highlightText: {
    color: '#FF8D4D',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
  horizontalContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});

export default Register;
