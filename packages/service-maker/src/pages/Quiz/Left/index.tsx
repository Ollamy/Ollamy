import react from 'react';

// import { useCallback } from "react";
// import { useParams } from "react-router-dom";
// import type { QuestionModel } from "services/api/out";
// import styled from "styled-components";
//
// import api from "../../../services/api";
//
// // eslint-disable-next-line
// interface LeftProps {
//   quizData: QuestionModel[] | [];
//   setQuizData: any;
//   setCurrentEditedQuestionId: any;
// }
//
// function Left({
//   quizData,
//   setQuizData,
//   setCurrentEditedQuestionId,
// }: LeftProps): ReactElement {
//   const { mutateAsync: createQuestion } = api.question.useCreateQuestion();
//   const { mutateAsync: removeQuestion } = api.question.useRemoveQuestion();
//   const { lessonId } = useParams();
//
//   const handleAddQuestion = useCallback(async () => {
//     if (!lessonId || !quizData) return;
//
//     const questionOrder: number = quizData.length + 1;
//
//     const newData = {
//       lessonId,
//       title: `Question ${questionOrder}`,
//       description: "no description",
//       data: "test",
//       typeAnswer: "TEXT",
//       typeQuestion: "TEXT",
//       picture: "",
//       difficulty: "BEGINNER",
//       order: questionOrder,
//     };
//
//     await createQuestion({
//       createQuestionModel: newData,
//     }).then((r) => {
//       setQuizData((old: any) => [
//         { ...old },
//         {
//           id: r,
//           description: newData.description,
//           lessonId,
//           order: newData.order,
//           title: newData.title,
//           typeAnswer: newData.typeAnswer,
//           typeQuestion: newData.typeQuestion,
//         },
//       ]);
//     });
//   }, [createQuestion, lessonId, quizData, setQuizData]);
//
//   const handleClickOnQuestion = useCallback(
//     (id: string) => {
//       setCurrentEditedQuestionId(id);
//     },
//     [setCurrentEditedQuestionId]
//   );
//
//   const handleRemoveQuestion = useCallback(
//     (e: any, id: string) => {
//       e.preventDefault();
//       e.stopPropagation();
//       removeQuestion({ idQuestionModel: { id } });
//     },
//     [removeQuestion]
//   );
//
//   return (
//     <Container>
//       <Button onClick={handleAddQuestion}>Add question</Button>
//       {quizData?.map(({ title, id }, index) => (
//         <Question onClick={() => handleClickOnQuestion(id)} key={`${index}`}>
//           {title}
//           {/* <p onClick={(e) => handleRemoveQuestion(e, id)}>x</p> */}
//         </Question>
//       ))}
//     </Container>
//   );
// }
//
// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//
//   width: 100%;
//   height: 100%;
//
//   padding: 24px;
//   box-sizing: border-box;
//
//   gap: 12px;
//
//   border-right: 1px solid #e5e5e5;
// `;
//
// const Button = styled.button``;
//
// const Question = styled.button`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//
//   height: 30px;
//
//   border: none;
//   border-radius: 4px;
//   background: #f2f4f4;
//
//   cursor: pointer;
// `;
//
// export default Left;
