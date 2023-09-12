import { Image, StyleSheet } from 'react-native';

import CustomIconButton from '../../components/buttons/customIconButton';
// @ts-ignore
import EARTH from '../../../assets/icons/earth.svg';
// @ts-ignore
import TRESOR from '../../../assets/icons/tresor.svg';
// @ts-ignore
import PROFILE from '../../../assets/icons/profile.svg';

import { Box, View } from 'native-base';
import { useNavigate } from 'react-router-native';

const TopBar = () => {
  const navigate = useNavigate();
  const handlePress = () => {
    // Handle button press here
    console.log('Button Pressed');
  };

  return (
    <Box style={styles.container}>
      <Box style={styles.iconContainer}>
        <CustomIconButton onPress={() => navigate('/home')} style={{ padding: 5 }}>
          <Box height="30px" width="30px">
            <Image style={{ height: '100%', width: '100%' }} source={EARTH}></Image>
          </Box>
        </CustomIconButton>
      </Box>
      <Box style={styles.iconContainer}>
        <CustomIconButton onPress={handlePress} style={{ padding: 5 }}>
          <Box height="35px" width="35px">
            <Image style={{ height: '100%', width: '100%' }} source={TRESOR}></Image>
          </Box>
        </CustomIconButton>
        <View
          style={{
            borderWidth: 1,
            borderColor: '#BDBDBD',
            marginLeft: 5,
            marginRight: 3,
            height: 30,
          }}
        />
        <CustomIconButton onPress={handlePress} style={{ padding: 5 }}>
          <Box height="35px" width="35px">
            <Image style={{ height: '100%', width: '100%' }} source={PROFILE}></Image>
          </Box>
        </CustomIconButton>
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 60,
    borderColor: '#BDBDBD',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowRadius: 10,
    shadowColor: '#BDBDBD',
  },
  iconContainer: {
    borderRadius: 8,
    shadowRadius: 10,
    shadowColor: '#BDBDBD',

    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default TopBar;
