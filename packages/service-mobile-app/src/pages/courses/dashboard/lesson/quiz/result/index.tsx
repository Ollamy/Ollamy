// @ts-ignore
import BADCHECK from 'assets/icons/badCheck.png';
// @ts-ignore
import CUP from 'assets/icons/cup.png';
// @ts-ignore
import FAIL from 'assets/icons/fail.png';
// @ts-ignore
import GOODCHECK from 'assets/icons/goodCheck.png';
import { Box, HStack, Image, Text, View, VStack } from 'native-base';
import { useNavigate } from 'react-router-native';
import TextButton from 'src/components/Buttons/TextButton';
import TopBar from 'src/components/layout/TopBar/TopBar';

interface LectureProps {
  totalQuestionNb: number;
  errorNb: number;
}

function ResultPage({ totalQuestionNb, errorNb }: LectureProps) {
  const navigate = useNavigate();
  const haveFailled = errorNb / totalQuestionNb >= 2 / 3;

  return (
    <>
      <TopBar />
      <VStack backgroundColor={'#EDE8FF'} width={'100%'} height={'100%'} alignItems={'center'}>
        <View style={{ marginTop: 40, marginBottom: 65, width: 300 }}>
          <VStack
            width={'100%'}
            borderRadius={8}
            borderColor={'#BDBDBD'}
            borderWidth={1}
            shadow={10}
            padding={28}
            paddingBottom={'95px'}
            space={34}
            justifyContent={'flex-start'}
            alignItems={'center'}
            backgroundColor={'white'}
          >
            <Text fontSize={15} fontWeight={'500'} textAlign={'center'}>
              {' '}
              {haveFailled ? 'Do it again!' : 'Good job!'}
            </Text>
            <Box height={'100px'} width={'100px'}>
              {haveFailled ? (
                <Image style={{ height: '100%', width: '100%' }} source={FAIL} alt={'Fail body'} />
              ) : (
                <Image style={{ height: '100%', width: '100%' }} source={CUP} alt={'Result cup'} />
              )}
            </Box>
            <HStack width={'100%'} justifyContent={'space-between'}>
              <VStack alignItems={'center'}>
                <Box height={'24px'} width={'24px'}>
                  <Image height={'100%'} width={'100%'} source={GOODCHECK} alt={'Good heck'} />
                </Box>
                <Text>
                  {totalQuestionNb - errorNb} / {totalQuestionNb}
                </Text>
                <Text>Good Answers</Text>
              </VStack>
              <VStack alignItems={'center'}>
                <Box height={'24px'} width={'24px'}>
                  <Image height={'100%'} width={'100%'} source={BADCHECK} alt={'Bad heck'} />
                </Box>
                <Text>
                  {errorNb} / {totalQuestionNb}
                </Text>
                <Text>Wrong Answers</Text>
              </VStack>
            </HStack>
          </VStack>
        </View>
        <TextButton title={'Main Menu'} onPress={() => navigate('/home')} />
      </VStack>
    </>
  );
}

export default ResultPage;
