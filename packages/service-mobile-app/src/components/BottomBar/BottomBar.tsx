// @ts-ignore
import COMMUNITY from 'assets/icons/community.png';
// @ts-ignore
import EVENT from 'assets/icons/event.png';
// @ts-ignore
import MEDAL from 'assets/icons/medal.png';
// @ts-ignore
import PROGRESS from 'assets/icons/progress.png';
import { Box } from 'native-base';
import { Image, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-native';
import CustomIconButton from 'src/components/Buttons/CustomIconButton/CustomIconButton';

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
    borderBottomWidth: 0,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

function BottomBar() {
  const handlePress = () => {
    // eslint-disable-next-line no-console
    console.log('Button Pressed');
  };
  const navigate = useNavigate();

  return (
    <Box style={styles.container}>
      <CustomIconButton onPress={() => navigate('/home')}>
        <Box height="35px" width="35px">
          <Image style={{ height: '100%', width: '100%' }} source={PROGRESS} />
        </Box>
      </CustomIconButton>
      <CustomIconButton onPress={() => navigate('/course/join/fd73de44-a783-4f31-82f9-c07b60dbf73f')}>
        <Box height="35px" width="35px">
          <Image style={{ height: '100%', width: '100%' }} source={EVENT} />
        </Box>
      </CustomIconButton>
      <CustomIconButton onPress={() => navigate('/chat')}>
        <Box height="35px" width="35px">
          <Image style={{ height: '100%', width: '100%' }} source={COMMUNITY} />
        </Box>
      </CustomIconButton>
      <CustomIconButton onPress={handlePress}>
        <Box height="35px" width="35px">
          <Image style={{ height: '100%', width: '100%' }} source={MEDAL} />
        </Box>
      </CustomIconButton>
    </Box>
  );
}

export default BottomBar;
