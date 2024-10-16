// @ts-ignore
import FAVICON from 'assets/favicon.png';
import { HStack, Image, Pressable } from 'native-base';
import { Text } from 'react-native';
import { useNavigate } from 'react-router-native';
import type { UserCourse } from 'src/services/user/user.dto';

function CourseRowButton({ course }: { course: UserCourse }) {
  const navigate = useNavigate();

  return (
    <Pressable w={'100%'} onPress={() => navigate(`/course/${course.id}`)}>
      <HStack
        alignItems={'center'}
        w={'full'}
        space={'10px'}
        p={'12px'}
        rounded={'md'}
        borderColor={'gray.200'}
        borderWidth={1}
      >
        {course.pictureId ? (
          <Image size={12} alt={'picture'} resizeMode={'contain'} source={{ uri: course.pictureId }} />
        ) : (
          <Image size={12} resizeMode={'contain'} source={FAVICON} alt={'fav-icon'} />
        )}
        <Text style={{ fontWeight: '600', fontSize: 14 }}>{course.title}</Text>
      </HStack>
    </Pressable>
  );
}

export default CourseRowButton;
