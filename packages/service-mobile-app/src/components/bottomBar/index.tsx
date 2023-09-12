import { Image, StyleSheet } from 'react-native';

import CustomIconButton from '../../components/buttons/customIconButton';
// @ts-ignore
import PROGRESS from '../../../assets/icons/progress.svg';
// @ts-ignore
import EVENT from '../../../assets/icons/event.svg';
// @ts-ignore
import COMMUNITY from '../../../assets/icons/community.svg';
// @ts-ignore
import MEDAL from '../../../assets/icons/medal.svg';
import { Box } from 'native-base';
import { useNavigate } from 'react-router-native';

const BottomBar = () => {
  const handlePress = () => {
    console.log('Button Pressed');
  };
  const navigate = useNavigate();

  return (
    <Box style={styles.container}>
      <CustomIconButton onPress={handlePress}>
        <Box height="35px" width="35px">
          <Image style={{ height: '100%', width: '100%' }} source={PROGRESS}></Image>
        </Box>
      </CustomIconButton>
      <CustomIconButton onPress={handlePress}>
        <Box height="35px" width="35px">
          <Image style={{ height: '100%', width: '100%' }} source={EVENT}></Image>
        </Box>
      </CustomIconButton>
      <CustomIconButton onPress={() => navigate('/chat')}>
        <Box height="35px" width="35px">
          <Image style={{ height: '100%', width: '100%' }} source={COMMUNITY}></Image>
        </Box>
      </CustomIconButton>
      <CustomIconButton onPress={handlePress}>
        <Box height="35px" width="35px">
          <Image style={{ height: '100%', width: '100%' }} source={MEDAL}></Image>
        </Box>
      </CustomIconButton>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderColor: '#BDBDBD',
    borderWidth: 1,
    shadowRadius: 10,
    shadowColor: '#BDBDBD',
    paddingHorizontal: 10,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default BottomBar;
