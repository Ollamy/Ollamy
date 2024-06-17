// @ts-ignore
import OLLAMY from 'assets/Ollamy.png';
import { Box, Image, Text, VStack } from 'native-base';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-native';
import TextButton from 'src/components/Buttons/TextButton';

interface ErrorPageProps {
  customMessage?: string;
}

function ErrorPage({ customMessage = 'Sorry, an unexpected error has occurred.' }: ErrorPageProps) {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate('/home');
  }, [navigate]);

  return (
    <VStack height={'100%'} justifyContent={'center'} alignItems={'center'}>
      <Box height={'100px'} width={'200px'} marginBottom={100}>
        <Image style={{ height: '100%', width: '100%' }} source={OLLAMY} alt={'Ollamy'} />
      </Box>
      <Text marginBottom={5}>{customMessage}</Text>
      <TextButton title={'Go back home'} onPress={handleClick} />
    </VStack>
  );
}

export default ErrorPage;
