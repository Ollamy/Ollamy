// @ts-ignore
import { FontAwesome6 } from '@expo/vector-icons';
// @ts-ignore
import PROFILE from 'assets/icons/user-pp.png';
import { Box, Button, Icon, Text } from 'native-base';
import { Image, StyleSheet, View } from 'react-native';
import RCTNetworking from 'react-native/Libraries/Network/RCTNetworking';
import { useNavigate } from 'react-router-native';
import { StatCard } from 'src/pages/profile/ProfileStats';
import { useGetUserQuery } from 'src/services/user/user';

const styles = StyleSheet.create({
  body: {
    flex: 1,
    margin: 24,
    justifyContent: 'space-between',
  },
  profileContainer: {
    width: '100%',
    gap: 10,
    borderRadius: 8,
    borderColor: '#BDBDBD',
    borderWidth: 1,
    shadowRadius: 10,
    padding: 10,

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameContainer: {
    textTransform: 'capitalize',
    fontWeight: 'bold',
  },
});

function Profile() {
  const navigate = useNavigate();
  const { data: user } = useGetUserQuery();

  if (!user) return <Box />;

  return (
    <View style={styles.body}>
      <Box style={styles.profileContainer}>
        <Box height={'100px'} width={'100px'}>
          <Image style={{ height: '100%', width: '100%' }} source={PROFILE} />
        </Box>
        <Text style={styles.nameContainer}>
          {user.firstname} {user.lastname}
        </Text>
        <Text>{user.email}</Text>
      </Box>
      <StatCard
        title={'Day streak'}
        value={'12'}
        icon={<Icon as={<FontAwesome6 name={'fire'} />} size={8} mr={2} color={'muted.400'} />}
      />
      <Button
        variant={'red'}
        onPress={() =>
          RCTNetworking.clearCookies(() => {
            navigate('/login');
          })
        }
      >
        Log out
      </Button>
    </View>
  );
}

export default Profile;
