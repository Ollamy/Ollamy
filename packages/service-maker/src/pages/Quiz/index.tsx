import react from 'react';
// import type { ReactElement } from "react";
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import type { QuestionModel } from "services/api/out";
// import styled from "styled-components";
//
// import TopBar from "../../components/TopBar";
// import api from "../../services/api";
//
// import Content from "./Content";
// import Left from "./Left";
// import Right from "./Right";
// import NewQuiz from "../NewQuiz/quiz";
//
// // eslint-disable-next-line
// interface QuizEditorProps {}
//
// // eslint-disable-next-line
// const QuizEditor = ({}: QuizEditorProps): ReactElement => {
//   return <NewQuiz />;
//   // const { mutateAsync: getQuestion } = api.lesson.useGetQuestion();
//   //
//   // const [quizData, setQuizData] = useState<QuestionModel[] | []>([]);
//   // const [typeSelected, setTypeSelected] = useState<
//   //   "single" | "multiple" | "free"
//   // >("free");
//   //
//   // const [currentEditedQuestionId, setCurrentEditedQuestionId] = useState<
//   //   string | undefined
//   // >(undefined);
//   //
//   // const { lessonId } = useParams();
//   //
//   // useEffect(() => {
//   //   if (!lessonId) return;
//   //
//   //   const getQ = async () => {
//   //     getQuestion({ id: lessonId }).then((r) => {
//   //       setQuizData(r);
//   //     });
//   //   };
//   //   getQ();
//   // }, [getQuestion, lessonId]);
//   //
//   // const [doneStatus, setDoneStatus] = useState(false);
//   //
//   // return (
//   //   <Container>
//   //     <TopBar title="Ollamy Maker" />
//   //     <Body>
//   //       <LeftPart>
//   //         <Left
//   //           quizData={quizData}
//   //           setQuizData={setQuizData}
//   //           setCurrentEditedQuestionId={setCurrentEditedQuestionId}
//   //         />
//   //       </LeftPart>
//   //       <ContentPart>
//   //         {currentEditedQuestionId && (
//   //           <Content
//   //             setDoneStatus={setDoneStatus}
//   //             typeSelected={typeSelected}
//   //             doneStatus={doneStatus}
//   //             setQuizData={setQuizData}
//   //             currentEditedQuestionId={currentEditedQuestionId}
//   //           />
//   //         )}
//   //       </ContentPart>
//   //       <RightPart>
//   //         <Right
//   //           quizData={quizData}
//   //           typeSelected={typeSelected}
//   //           setTypeSelected={setTypeSelected}
//   //           setDoneStatus={setDoneStatus}
//   //           doneStatus={doneStatus}
//   //         />
//   //       </RightPart>
//   //     </Body>
//   //   </Container>
//   // );
// };
//
// const Container = styled.div`
//   display: block;
//   width: 100%;
//   height: 100vh;
// `;
//
// const Body = styled.div`
//   display: flex;
//
//   width: 100%;
//   height: 95%;
// `;
//
// const LeftPart = styled.div`
//   min-width: 400px;
//   height: 100%;
// `;
//
// const ContentPart = styled.div`
//   height: 100%;
//   width: 100%;
// `;
//
// const RightPart = styled.div`
//   min-width: 400px;
//   height: 100%;
// `;
// export default QuizEditor;
