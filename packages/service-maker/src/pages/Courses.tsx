/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line import/no-extraneous-dependencies
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import "../styles.css";

import Loupe from '../assets/loupe-1.png';
import ReactImg from '../assets/react.svg';
import Add from '../assets/add.png';

import { ButtonMaker } from '../components/button/button';
import { FormMaker } from '../components/form/form';
import { InputMaker } from '../components/input/input';
import { SideBarMaker } from '../components/sidebar/sidebar';

interface Item {
    text: string;
    image: string;
  }
  
export function Courses(): React.ReactNode {
    const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
    } = useForm();
  
    const onSubmit = async (data: any) => {
      try {
        const courses = await axios.post(`http://localhost:3000/course`, {
          ...data,
        });
      } catch (err) {
        // pop up error
      }
    };

    const [filterText, setFilterText] = useState('');
    const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  
    const items: Item[] = [
      { text: 'Learn React', image: ReactImg },
      { text: 'Learn Angular', image: 'image-63.png' },
      { text: 'Learn Flutter', image: 'image-64.png' },
    ];
  
    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchText = e.target.value;
        setFilterText(searchText);
    
        // Filter items based on user input
        const filtered = items.filter(item =>
          item.text.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredItems(filtered);
    };

    useEffect(() => {
        handleFilterChange({ target: { value: filterText } } as React.ChangeEvent<HTMLInputElement>);
      }, []);

    const handleLoginClick = (href: string): void => {
        window.location.href = href;
    };
    
    return (
      <div className="courses">
        <div className="group">
          <div className="frame">
            <button className="text-wrapper" onClick={() => handleLoginClick('explore')}>Explore</button>
            <div className="editable-div">
              <img className="loupe" alt="Loupe" src={Loupe} />
              <input
                className="no-border-input"
                type="text"
                placeholder="Search..."
                value={filterText}
                onChange={handleFilterChange}
              />
            </div>
            <button className="text-wrapper" onClick={() => handleLoginClick('dashboard')}>Dashboard</button>
            <button className="text-wrapper" onClick={() => handleLoginClick('profile')}>Profile</button>
          </div>
        </div>
        <div className="text-wrapper-3">My courses</div>
        <div className="overlap">
          <div className="group-3">
            <button className="div-wrapper" onClick={() => handleLoginClick('create-course')}>
                <img className="overlap-group" alt="Add" src={Add} />
            </button>
            <div className="text-wrapper-4">Create new course</div>
          </div>
        </div>
        <div className="frame-2">
         {filteredItems.map((item, index) => (
          <div className="group-5" key={index}>
            <div className="overlap-group-2">
              <img
                className="image-3"
                alt="Image"
                src={item.image}
              />
              <div className="text-wrapper-5">{item.text}</div>
            </div>
          </div>
         ))}
        </div>
      </div>
    );
  };
  