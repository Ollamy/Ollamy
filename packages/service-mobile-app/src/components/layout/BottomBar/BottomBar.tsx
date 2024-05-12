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
      <Button variant="ghost" onPress={() => navigate('/course/join/52d95ae7-c83f-4226-9d3d-2b00f1c6043d')}>
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
