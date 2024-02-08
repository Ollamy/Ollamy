import { SafeAreaView } from 'react-native-safe-area-context';
import { Outlet } from 'react-router-native';
import { VStack } from 'native-base';
import BottomBar from 'src/components/BottomBar';
import TopBar from 'src/components/TopBar';

function AppSafeArea(): JSX.Element {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<TopBar />
			<VStack flex="1" w="100%" p="24px" space="8">
				<Outlet />
			</VStack>
			<BottomBar />
		</SafeAreaView>
	);
}

export default AppSafeArea;
