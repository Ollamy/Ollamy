import type { ChangeEvent, ReactElement } from 'react';
import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from 'services/api';
import styled from 'styled-components';

interface FormState {
  title: string;
  description: string;
  color: string;
}

const initialFormState: FormState = {
  title: '',
  description: '',
  color: '#E6674F',
};

function DashboardContent(): ReactElement {
  const navigate = useNavigate();

  const [currentColor, setCurrentColor] = useState(0);
  const [isMenuDisplayed, setIsMenuDisplayed] = useState(false);

  const { data: coursesList } = api.user.useGetUserCourses();
  const { mutateAsync: createCourseMutation } = api.course.useCreateCourse();

  const [formData, setFormData] = useState<FormState>(initialFormState);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const colorsChoice = ['#E6674F', '#876BF6', '#F195A4'];

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({ ...prevState, [name]: value }));
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleOpenMenu = useCallback((e: any) => {
    if (e.currentTarget !== e.target) return;

    setIsMenuDisplayed(true);
  }, []);

  const handleChangeColor = useCallback(() => {
    setCurrentColor((old) => (old + 1) % colorsChoice.length);
  }, [colorsChoice.length]);

  const handleSubmit = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (e: any) => {
      e.preventDefault();

      try {
        await createCourseMutation({
          createCourseModel: {
            title: formData.title,
            description: formData.description,
            picture: formData.color,
          },
        });
        setCurrentColor(0);
        setFormData(initialFormState);
        setIsMenuDisplayed(false);
      } catch (err) {
        // pop up error
      }
    },
    [
      createCourseMutation,
      formData.color,
      formData.description,
      formData.title,
    ],
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleReset = useCallback((e: any) => {
    e.preventDefault();

    setCurrentColor(0);
    setFormData(initialFormState);
    setIsMenuDisplayed(false);
  }, []);

  return (
    <Container>
      <CoursesTopBar>
        My courses
        <AddButton onClick={handleOpenMenu}>
          Create new course
          {isMenuDisplayed && (
            <NewCourseMenu>
              <MenuTitle>Create New Course</MenuTitle>
              <CouseColorContainer>
                <CourseColor
                  onClick={handleChangeColor}
                  currentColor={colorsChoice[currentColor]}
                >
                  <Image src="public/sparkles-outline.svg" />
                </CourseColor>
              </CouseColorContainer>
              <Form onReset={handleReset} onSubmit={handleSubmit}>
                <Input
                  required
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Course Title"
                />
                <Input
                  required
                  name="description"
                  onChange={handleChange}
                  value={formData.description}
                  placeholder="Course Description"
                />
                <ButtonContainer>
                  <CancelButton type="reset">Cancel</CancelButton>
                  <CreateButton type="submit">Create</CreateButton>
                </ButtonContainer>
              </Form>
            </NewCourseMenu>
          )}
        </AddButton>
      </CoursesTopBar>
      <CoursesContainer>
        {coursesList &&
          coursesList.courses.map((course: any, index) => (
            <CoursesBox key={`${course.title}-${index}`}>
              <CourseLogo color="#E6674F" />
              <TextContainer>
                <CourseTitle>{course.title}</CourseTitle>
                <CourseDescription>{course.description}</CourseDescription>
              </TextContainer>
              <EditImage
                src="public/create-outline.svg"
                onClick={() => {
                  navigate(`/course/${course.id}`);
                }}
              />
            </CoursesBox>
          ))}
      </CoursesContainer>
    </Container>
  );
}

const Container = styled.div`
  display: block;

  width: 80%;
  height: 100%;

  padding: 40px;
  box-sizing: border-box;
`;

const CoursesTopBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  padding: 12px;
  box-sizing: border-box;

  font-size: 20px;

  color: #3d3d3d;
`;

const AddButton = styled.button`
  position: relative;

  width: 150px;
  height: 34px;

  margin-left: 24px;

  color: #ffffff;
  border-radius: 4px;
  background: #f4ad69;
  border: 1px solid #a27346;

  cursor: pointer;
`;

const NewCourseMenu = styled.div`
  position: absolute;

  width: 487px;

  top: 100%;
  left: 50%;
  right: unset;
  bottom: unset;
  margin: 15px 0 0 0;
  transform: translate(-50%, 0);

  padding: 24px;
  box-sizing: border-box;

  border-radius: 23.238px;
  background: #fff;
  box-shadow: 0 11.61887px 124.28px 0 rgba(37, 72, 153, 0.17);

  cursor: auto;
`;

const MenuTitle = styled.h2`
  margin: 0;

  color: #3d3d3d;
  text-align: left;
  font-weight: 700;
  font-style: normal;
  font-size: 24px;
  line-height: 30px;
  font-family:
    Public Sans,
    sans-serif;
`;

const CouseColorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  padding: 20px 0;
  box-sizing: border-box;
`;

interface CourseColorProps {
  currentColor: string;
}

const CourseColor = styled.div<CourseColorProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 60px;
  height: 60px;

  padding: 16px;
  box-sizing: border-box;

  border-radius: 8px;
  border: 2px solid #3d3d3d;
  background: ${({ currentColor }) => currentColor};

  cursor: pointer;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;

  margin-top: 16px;

  gap: 16px;
`;

const Input = styled.input`
  width: 100%;
  height: 40px;

  color: #757575;
  font-family:
    Public Sans,
    sans-serif;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 30px;

  padding: 0 12px;
  box-sizing: border-box;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 24px;

  width: 100%;
`;

const CancelButton = styled.button`
  width: 100%;
  height: 40px;

  border: none;
  border-radius: 10px;
  background: #f5f7fb;

  color: rgba(21, 25, 32, 0.5);
  font-family:
    Work Sans,
    sans-serif;
  font-size: 18.482px;
  font-style: normal;
  font-weight: 600;
  line-height: 31.683px; /* 171.429% */
  cursor: pointer;
`;

const CreateButton = styled.button`
  width: 100%;
  height: 40px;

  border-radius: 10px;
  background: #5f65f6;
  border: none;

  color: var(--white-white-100-high-emphasys, #fff);
  text-align: center;
  font-family:
    Work Sans,
    sans-serif;
  font-size: 18.482px;
  font-style: normal;
  font-weight: 600;
  line-height: 31.683px; /* 171.429% */
  cursor: pointer;
`;

const CoursesContainer = styled.div`
  display: flex;
  flex-direction: column;

  margin-top: 24px;
  gap: 24px;
`;

const CoursesBox = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  height: 100px;

  background: white;

  padding: 12px;
  box-sizing: border-box;

  border-radius: 8px;
  border: 1px solid #c7c7c7;
`;

interface CourseLogoProps {
  color: string;
}

const CourseLogo = styled.div<CourseLogoProps>`
  min-width: 74px;
  height: 100%;

  background: ${({ color }) => color};
  border-radius: 4px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;

  gap: 4px;

  width: 100%;
  height: 100%;
`;

const CourseTitle = styled.h3`
  margin: 0;
  width: 100%;

  color: #3d3d3d;
  font-size: 24px;
`;

const CourseDescription = styled.p`
  margin: 0;
  width: 100%;
  color: #676767;
  font-size: 14px;

  font-weight: 400;
  font-family: sans-serif;
`;

const EditImage = styled.img`
  position: absolute;
  right: 24px;

  width: 20px;
  height: 20px;

  cursor: pointer;
`;

export default DashboardContent;
