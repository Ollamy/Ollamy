import { Controller, useForm } from 'react-hook-form';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView, TextInput } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { ToastShowParams } from 'react-native-toast-message';
import Toast from 'react-native-toast-message';
import { useNavigate } from 'react-router-dom';
import type { AxiosError, AxiosResponse } from 'axios';
import { FormControl } from 'native-base';
import { useLoginMutation } from 'src/services/auth';

interface LoginForm {
	email: string;
	password: string;
}

function Login(): JSX.Element {
	const insets = useSafeAreaInsets();
	const navigate = useNavigate();

	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<LoginForm>();
	const [login, { isLoading }] = useLoginMutation();
	const showToast = (body: ToastShowParams): void => Toast.show(body);

	const onSubmit = async (data: LoginForm) => {
		try {
			await login({
				email: data.email,
				password: data.password,
			});
			showToast({
				type: 'success',
				topOffset: 92,
				text1: 'Success',
				text2: 'You have successfully logged in',
			});
			navigate('/home');
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
			<Text style={{ ...styles.highlightText, fontSize: 24 }}>Log in</Text>
			<Controller
				control={control}
				name="email"
				rules={{ required: true }}
				render={({ field: { onChange, onBlur, value } }) => (
					<FormControl isInvalid={!!errors.email}>
						<GestureHandlerRootView>
							<TextInput
								value={value}
								onChangeText={onChange}
								onBlur={onBlur}
								inputMode="email"
								style={styles.input}
								placeholder="Email"
							/>
						</GestureHandlerRootView>
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
						<GestureHandlerRootView>
							<TextInput
								secureTextEntry
								value={value}
								onChangeText={onChange}
								onBlur={onBlur}
								inputMode="text"
								style={styles.input}
								placeholder="Password"
							/>
						</GestureHandlerRootView>
						{errors.password?.type === 'required' && (
							<FormControl.ErrorMessage>This field is required</FormControl.ErrorMessage>
						)}
					</FormControl>
				)}
			/>
			<View style={styles.horizontalContainer}>
				<Text style={styles.text}>Forgot your password ?</Text>
				<Text style={styles.highlightText}>Recover password</Text>
			</View>
			{isLoading ? (
				<ActivityIndicator />
			) : (
				<TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.button}>
					<Text style={styles.buttonText}>Log in</Text>
				</TouchableOpacity>
			)}
			<View style={styles.horizontalContainer}>
				<Text style={styles.text}>Don`t have an account ?</Text>
				<Text onPress={() => navigate('/')} style={styles.highlightText}>
					Register
				</Text>
			</View>
			<Toast />
		</View>
	);
}

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

export default Login;
