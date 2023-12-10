import { styled } from "styled-components";

interface CreateModalProps {
  title?: string;

  isOpen: boolean;
  setIsOpen: (b: boolean) => void;

  onClose?: () => Promise<void>;
  onSubmit?: () => Promise<void>;

  children: any;
}

const CreateModal = ({
  onClose,
  onSubmit,
  isOpen,
  title: modalTitle,
  children,
}: CreateModalProps) => {
  return (
    <>
      <ModalWrapper isOpen={isOpen}>
        <ModalContent>
          <ModalTitle>Create New Section</ModalTitle>
          <ModalBody>{children}</ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onSubmit}>Create</Button>
          </ModalFooter>
        </ModalContent>
      </ModalWrapper>
    </>
  );
};

const ModalWrapper = styled.div<{ isOpen: boolean }>`
  display: ${(props) => (props.isOpen ? "block" : "none")};
  position: fixed;
  top: 45%;
  left: 45%;
`;

const ModalContent = styled.div`
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  padding: 20px;
`;

const ModalTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
`;

const ModalBody = styled.div`
  margin-bottom: 20px;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #007bff;
  color: white;

  &:first-child {
    margin-right: 20px;
    background-color: #ccc;
    color: black;
  }

  &:hover {
    background-color: #0062cc;
  }
`;
export default CreateModal;
