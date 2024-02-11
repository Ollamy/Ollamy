import { SafeAreaView } from 'react-native-safe-area-context';
import { Outlet, useLocation } from 'react-router-native';
import { VStack } from 'native-base';
import BottomBar from 'src/components/bottomBar';
import TopBar from 'src/components/topBar';

function AppSafeArea(): JSX.Element {
	const route = useLocation();
	const disableBars = route.pathname.includes('/lesson/');

	return (
		<SafeAreaView style={{ flex: 1 }}>
			{!disableBars ? (
				<>
					<TopBar />
					<VStack flex="1" w="100%" p="24px" space="8">
						<Outlet />
					</VStack>
					<BottomBar />
				</>
			) : (
				<Outlet />
			)}
		</SafeAreaView>
	);
}

export default AppSafeArea;
