import { VStack } from 'native-base';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { Outlet, useLocation } from 'react-router-native';
import BottomBar from 'src/components/layout/BottomBar/BottomBar';
import TopBar from 'src/components/layout/TopBar/TopBar';
import EventModal from 'src/components/Modal/Events';
import type { FactoryEventComponentData } from 'src/components/Modal/Events/eventFactory';
import { fetchEventData } from 'src/features/backgroundJobs';

function AppSafeArea(): JSX.Element {
  const route = useLocation();
  const disableBars = route.pathname.includes('/lesson/');

  const [isModalVisible, setModalVisible] = useState(true);
  const [modalData, setModalData] = useState<FactoryEventComponentData | undefined>(undefined);
  const triggerModal = (data: FactoryEventComponentData) => {
    setModalData(data);
    setModalVisible(true);
  };

  useEffect(() => {
    const interval = setInterval(() => fetchEventData(triggerModal), 5000);
    return () => clearInterval(interval);
  }, []);

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
