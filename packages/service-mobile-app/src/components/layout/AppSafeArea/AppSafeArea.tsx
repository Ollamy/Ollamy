import { VStack } from 'native-base';
import { SafeAreaView } from 'react-native';
import { Outlet, useLocation } from 'react-router-native';
import BottomBar from 'src/components/layout/BottomBar/BottomBar';
import TopBar from 'src/components/layout/TopBar/TopBar';

function AppSafeArea(): JSX.Element {
  const route = useLocation();
  const disableBars = route.pathname.includes('/lesson/');

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {!disableBars ? (
        <>
          <TopBar />
          <VStack flex={'1'} w={'100%'} p={'24px'} space={'8'}>
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
