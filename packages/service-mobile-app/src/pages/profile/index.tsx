// @ts-ignore
import PROFILE from 'assets/icons/user-pp.png';
import { Box, Button, Text } from 'native-base';
import { Image, StyleSheet, View } from 'react-native';
import { useNavigate } from 'react-router-native';
import { useGetUserQuery } from 'src/services/user/user';

const styles = StyleSheet.create({
  body: {
    flex: 1,
    margin: 24,
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
  const { data: user } = useGetUserQuery();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login');
  };

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
        <Button onPress={handleClick} />
      </Box>
    </View>
  );
}

export default Profile;
