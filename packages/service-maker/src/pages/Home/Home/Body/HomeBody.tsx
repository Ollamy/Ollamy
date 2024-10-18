import {
  FormEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import CourseCard from 'pages/Home/Home/Body/CourseCard/CourseCard';
import HomeSearchBar from 'pages/Home/Home/Body/SearchBar/HomeSearchBar';
import api from 'services/api';
import styled from 'styled-components';

import { UploadIcon, MagicWandIcon } from '@radix-ui/react-icons';

import { Skeleton, Spinner, Text } from '@radix-ui/themes';

function HomeBody() {
  const { data } = api.user.useGetUserCourses();
  const [searchValue, setSearchValue] = useState<string>('');
  const [courseFile, setCourseFile] = useState<File | undefined>(undefined);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const currentData = useMemo(() => {
    if (!data) return undefined;

    if (!searchValue) {
      return data.courses;
    }

    return data.courses
      .filter((element) =>
        element.title.toLowerCase().includes(searchValue.toLowerCase()),
      )
      .sort((a, b) => a.title.localeCompare(b.title));
  }, [data, searchValue]);

  const handleFileChange: FormEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      if ('files' in event.target) {
        setCourseFile((event.target.files as FileList)[0]);
      }
    },
    [setCourseFile],
  );

  const handleUploadCourseFile = async (courseFile: File) => {
    console.log('generate course with ai');
    try {
      setIsGenerating(true);
      // const response = await generateCourseFromFile(courseFile);
    } catch (error) {
      console.error(error);
    }
    setTimeout(() => {
      
      setIsGenerating(false);
    }, 3000);
  };

  useEffect(() => {
    if (courseFile !== undefined) {
      handleUploadCourseFile(courseFile);

      return () => setCourseFile(undefined);
    }
  }, [courseFile, setCourseFile]);

  return (
    <Container>
      <HomeSearchBar
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <Grid>
        <FileDropZone onChange={handleFileChange} $disabled={isGenerating}>
          {isGenerating ? (
            <>
              <Text align="center">
                We are currently generating your course
              </Text>
              <Spinner />
            </>
          ) : (
            <>
              <UploadIcon height={24} width={24} />
              <Text>Drag & drop any file here</Text>
              <Text>
                To{' '}
                <Text color="amber" weight="bold">
                  generate
                </Text>{' '}
                a course with AI
              </Text>
              <FileInput
                type="file"
                className="Input"
                id="file"
                accept={
                  'application/pdf, audio/mpeg, audio/mp3, audio/wav, image/png, image/jpeg, image/jpg, text/plain, video/mov, video/mpeg, video/mp4, video/mpg, video/avi, video/wmv, video/mpegps, video/flv'
                }
              />
              <MagicWandIcon height={24} width={24} />
            </>
          )}
        </FileDropZone>
        {currentData?.length ? (
          <>
            {currentData?.map(({ id, title, description, pictureId }) => (
              <CourseCard
                key={id}
                courseId={id}
                title={title}
                picture={pictureId}
                description={description}
              />
            ))}
          </>
        ) : currentData && !currentData.length ? (
          <TextPlaceholder>
            {"You haven't created a course yet!"}
          </TextPlaceholder>
        ) : (
          <Grid>
            <Skeleton width="350px" height="300px" />
            <Skeleton width="350px" height="300px" />
          </Grid>
        )}
      </Grid>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;

  flex: 1;
  gap: 60px;
  width: 100%;

  overflow: hidden;
`;

const FileDropZone = styled.div<{ $disabled?: boolean }>`
  position: relative;
  width: 350px;
  height: 300px;
  padding: 16px 16px 20px 16px;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;

  border: 1px dashed black;
  border-radius: 8px;
  
  cursor: pointer;
  pointer-events: ${({ $disabled }) => ($disabled ? 'none' : 'all')};

  &:hover {
    background-color: ${({ $disabled }) => ($disabled ? 'none' : '#c19e2c2e')};
    border-color: ${({ $disabled }) => ($disabled ? 'none' : '#c1a32c97')};
    border-color: #c1a32c97;
  }
`;

const FileInput = styled.input`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  transform: translate(0, -16px);
`;

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;

  width: 100%;
  flex-grow: 1;

  gap: 30px;

  overflow: scroll;
`;

const TextPlaceholder = styled(Text)`
  display: flex;
  align-items: center;

  gap: 8px;
`;

export default HomeBody;
