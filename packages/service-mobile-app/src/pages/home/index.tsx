import { Image, StyleSheet, View } from 'react-native';
import backendApi from '../../client';
import { useCallback, useEffect, useState } from 'react';

// @ts-ignore
import OLLAMY from '../../../assets/Ollamy.png';
import { Box } from 'native-base';
import BottomBar from '../../components/bottomBar';
import TopBar from '../../components/topBar';

export interface UserInfo {
  firstname: string;
  lastname: string;
  email: string;
}

const Home = () => {
  const [user, setUser] = useState<UserInfo>();
  const handleGetAuthenticatedServices = useCallback(async () => {
    const response = await backendApi.get('/user');
    setUser(response.data);
  }, []);

  useEffect(() => {
    handleGetAuthenticatedServices();
  }, [handleGetAuthenticatedServices]);
  return (
    <>
      <TopBar />
      <View style={styles.body}>
        <Box height="100px" width="200px">
          <Image style={{ height: '100%', width: '100%' }} source={OLLAMY}></Image>
        </Box>
        <View style={styles.horizontalContainer}>Home</View>
        {user && <View style={styles.horizontalContainer}>Welcome {user.firstname}</View>}
      </View>
      <BottomBar />
    </>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    gap: 24,
    alignItems: 'center',
  },
  horizontalContainer: {
    textTransform: 'capitalize',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});

export default Home;
