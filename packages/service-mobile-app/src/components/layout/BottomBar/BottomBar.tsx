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
  const handlePress = () => {
    console.log('Button Pressed');
  };
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
      <Button variant="ghost" onPress={() => navigate('/course/join/fd73de44-a783-4f31-82f9-c07b60dbf73f')}>
        <Image size={35} source={EVENT} alt="event" />
      </Button>
      <Button variant="ghost" onPress={() => navigate('/chat')}>
        <Image size={35} source={COMMUNITY} alt="community" />
      </Button>
      <Button variant="ghost" onPress={handlePress}>
        <Image size={35} source={MEDAL} alt="medal" />
      </Button>
    </HStack>
  );
}

export default BottomBar;
