import { SafeAreaView } from 'react-native-safe-area-context';
import { Outlet } from 'react-router-native';

const AppSafeArea = (): JSX.Element => {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Outlet />
		</SafeAreaView>
	);
};

export default AppSafeArea;
