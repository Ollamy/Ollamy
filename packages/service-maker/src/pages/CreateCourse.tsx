/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line import/no-extraneous-dependencies
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { ButtonMaker } from '../components/button/button';
import { FormMaker } from '../components/form/form';
import { InputMaker } from '../components/input/input';
import { SideBarMaker } from '../components/sidebar/sidebar';

export function CreateCourse(): React.ReactNode {
    const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
    } = useForm();

    const onSubmit = async (data: any) => {
      try {
        const createdCourse = await axios.post(`http://localhost:3000/course`, {
          ...data,
        });
        window.location.href = 'courses';

      } catch (err) {
        console.log(err);
      }
    };
  
    return (
      <div
        style={{
          display: 'flex',
          width: '100vw',
          height: '100vh',
          flexDirection: 'row',
        }}
      >
        <FormMaker>
          <h1
            style={{
              color: '#E6674F',
              marginTop: '140px',
              marginBottom: '60px',
              fontWeight: 'bolder',
              fontSize: '40px',
            }}
          >
            Create a Course
          </h1>
          <label htmlFor="title">Title</label>
          <InputMaker register={{ ...register('title') }} />
          <label htmlFor="description">Description</label>
          <InputMaker margin="0px 0px 20px 0px" register={{ ...register('description') }} />
          <ButtonMaker textButton="Create" onClick={handleSubmit(onSubmit)} />
        </FormMaker>
      </div>
    );
  }
  