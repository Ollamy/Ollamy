import React, { useState } from "react";
import { styled } from "styled-components";

interface DropdownProps {
  options: string[];
  selectedOption: string | null;
  setSelectedOption: (v: string | null) => void;
}

const Dropdown = (props: DropdownProps) => {
  const { options, selectedOption, setSelectedOption } = props;
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <DropdownContainer>
      <DropdownButton onClick={() => setIsOpen(!isOpen)}>
        {selectedOption ? selectedOption : "Select"}{" "}
        <Chevron>{isOpen ? "▼" : "▲"}</Chevron>
      </DropdownButton>
      <DropdownContent isOpen={isOpen}>
        {options.map((option, index) => (
          <DropdownItem key={index} onClick={() => handleOptionClick(option)}>
            {option}
          </DropdownItem>
        ))}
      </DropdownContent>
    </DropdownContainer>
  );
};

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button`
  width: 100%;

  display: flex;
  justify-content: flex-start;

  font-size: 16px;
  color: #333;
  background-color: #fff;
  padding: 8px 16px;

  border: 1px solid;
  border-radius: 8px;

  cursor: pointer;
`;

const DropdownContent = styled.div<{ isOpen: boolean }>`
  display: ${(props) => (props.isOpen ? "block" : "none")};
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

const DropdownItem = styled.div`
  padding: 12px 16px;
  cursor: pointer;

  &:hover {
    background-color: #f1f1f1;
  }
`;

const Chevron = styled.span`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  font-size: 18px;
  pointer-events: none;
`;

export default Dropdown;
