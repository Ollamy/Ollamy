import LeftSidePanel from "src/pages/Maker/browser/LeftSidePanel";
import QuestionMaker from "src/pages/Maker/browser/QuestionMaker";
import TopBar from "src/pages/Maker/browser/TopBar";
import {PagesProps} from "src/pages/interface";
import styled from "styled-components";
import {useEffect, useState} from "react";

export interface DataType {
  name: string;
}

const MakerBrowser = ({ children }: PagesProps): JSX.Element => {
  const [data, setData] = useState<DataType[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(undefined);

  return (
    <Container>
      {children}
      <TopBar />
      <SubContainer>
        <LeftSidePanel data={data} currentQuestion={currentQuestion} setData={setData} setCurrentQuestion={setCurrentQuestion} />
        {data && data.length >= currentQuestion && data.map((element, index) => {
          return (
            <QuestionMaker isDisplayed={index === currentQuestion} key={index} data={data} currentQuestion={currentQuestion} setCurrentQuestion={setCurrentQuestion} />
          )
        })}
      </SubContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  
  width: 100vw;
  height: 100vh;
  
  * {
    user-select: none;
  }
`;

const SubContainer = styled.div`
  display: flex;
  align-items: center;

  flex-grow: 1;
  width: 100%;
  //height: 100%;
  background: #f1f1f1;
`;

export default MakerBrowser;
