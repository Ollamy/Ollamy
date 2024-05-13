// @ts-ignore
import COMMUNITY from 'assets/icons/community.png';
// @ts-ignore
import EVENT from 'assets/icons/event.png';
// @ts-ignore
import MEDAL from 'assets/icons/medal.png';
// @ts-ignore
import PROGRESS from 'assets/icons/progress.png';
import { Button, HStack, Image } from 'native-base';
import { useNavigate } from 'react-router-native';

function BottomBar() {
  const navigate = useNavigate();

  return (
    <HStack
      w="full"
      borderColor="#BDBDBD"
      borderWidth={1}
      px="2.5"
      borderTopRightRadius={16}
      borderTopLeftRadius={16}
      borderBottomWidth={0}
      alignItems="center"
      justifyContent="space-between"
    >
      <Button variant="ghost" onPress={() => navigate('/home')}>
        <Image size={35} source={PROGRESS} alt="progress" />
      </Button>
      <Button variant="ghost" onPress={() => navigate('/course/09a06f0b-eb2d-4ac8-b68b-333642e38282/join')}>
        <Image size={35} source={EVENT} alt="event" />
      </Button>
      <Button variant="ghost" onPress={() => navigate('/chat')}>
        <Image size={35} source={COMMUNITY} alt="community" />
      </Button>
      <Button variant="ghost">
        <Image size={35} source={MEDAL} alt="medal" />
      </Button>
    </HStack>
  );
}

export default BottomBar;
