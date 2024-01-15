import styled from "styled-components";
import { ReactElement, useState } from "react";
import TopBar from "../../components/TopBar";
import Left from "./Left";
import Content from "./Content";
import Right from "./Right";

// eslint-disable-next-line
interface QuizEditorProps {}

// eslint-disable-next-line
const QuizEditor = ({}: QuizEditorProps): ReactElement => {
  const [quizData, setQuizData] = useState([]);
  const [typeSelected, setTypeSelected] = useState<
    "single" | "multiple" | "free"
  >("single");

  const [doneStatus, setDoneStatus] = useState(false);

  return (
    <Container>
      <TopBar title={"Ollamy Maker"} />
      <Body>
        <LeftPart>
          <Left quizData={quizData} />
        </LeftPart>
        <ContentPart>
          <Content
            setDoneStatus={setDoneStatus}
            typeSelected={typeSelected}
            doneStatus={doneStatus}
            setQuizData={setQuizData}
          />
        </ContentPart>
        <RightPart>
          <Right
            quizData={quizData}
            typeSelected={typeSelected}
            setTypeSelected={setTypeSelected}
            setDoneStatus={setDoneStatus}
            doneStatus={doneStatus}
          />
        </RightPart>
      </Body>
    </Container>
  );
};

const Container = styled.div`
  display: block;
  width: 100%;
  height: 100vh;
`;

const Body = styled.div`
  display: flex;

  width: 100%;
  height: 95%;
`;

const LeftPart = styled.div`
  min-width: 400px;
  height: 100%;
`;

const ContentPart = styled.div`
  height: 100%;
  width: 100%;
`;

const RightPart = styled.div`
  min-width: 400px;
  height: 100%;
`;
export default QuizEditor;
