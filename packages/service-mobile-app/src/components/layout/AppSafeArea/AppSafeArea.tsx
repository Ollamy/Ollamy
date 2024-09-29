import { VStack } from 'native-base';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { Outlet, useLocation } from 'react-router-native';
import BottomBar from 'src/components/layout/BottomBar/BottomBar';
import TopBar from 'src/components/layout/TopBar/TopBar';
import EventModal from 'src/components/Modal/Events';
import type { FactoryEventComponentData } from 'src/components/Modal/Events/eventFactory';
import { useGetEventQuery } from 'src/services/user/user';

function AppSafeArea(): JSX.Element {
  const route = useLocation();
  const disableBars = route.pathname.includes('/lesson/');

  const [isModalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState<FactoryEventComponentData | undefined>(undefined);
  const triggerModal = (data: FactoryEventComponentData) => {
    setModalData(data);
    setModalVisible(true);
  };

  const { data: event, refetch } = useGetEventQuery();

  useEffect(() => {
    const interval = setInterval(refetch, 5000);
    return () => clearInterval(interval);
  }, [refetch]);

  useEffect(() => {
    if (event && !(event instanceof Array)) {
      // @ts-ignore
      triggerModal(event);
    }
  }, [event]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {!disableBars ? (
        <>
          <TopBar />
          <VStack flex={'1'} w={'100%'} p={'24px'} space={'8'}>
            <Outlet />
          </VStack>
          <BottomBar />
          <EventModal data={modalData} isModalVisible={isModalVisible} setModalVisible={setModalVisible} />
        </>
      ) : (
        <Outlet />
      )}
    </SafeAreaView>
  );
}

export default AppSafeArea;
