import react from 'react';
// import { useCallback, useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import styled from "styled-components";
//
//
// // eslint-disable-next-line
// interface ContentProps {
//   doneStatus: boolean;
//   setQuizData: any;
//   typeSelected: "single" | "multiple" | "free";
//   setDoneStatus: any;
//   currentEditedQuestionId: string;
// }
//
// function Content({
//   doneStatus,
//   setQuizData,
//   typeSelected,
//   setDoneStatus,
//   currentEditedQuestionId,
// }: ContentProps): ReactElement {
//   const { mutateAsync: getQuestion } = api.question.useGetQuestion();
//   const { mutateAsync: getAnswer } = api.answer.useGetAnswer();
//   const { mutateAsync: updateQuestion } = api.question.useUpdateQuestion();
//   const { mutateAsync: createAnswer } = api.answer.useCreateAnswer();
//
//   const [questionValue, setQuestionValue] = useState("");
//   const [answer, setAnswer] = useState("");
//
//   const { lessonId } = useParams();
//
//   useEffect(() => {
//     const getQ = async () => {
//       await getQuestion({ id: currentEditedQuestionId }).then((r) => {
//         console.log(r);
//         setQuestionValue(r.title);
//         getAnswer({ id: r.trustAnswerId })
//           .then((rr) => {
//             console.log(rr);
//             setAnswer(rr.data);
//           })
//           .catch(() => {
//             setAnswer("");
//           });
//       });
//     };
//
//     getQ();
//   }, [currentEditedQuestionId, getQuestion]);
//
//   const handleChangeQuestionValue = useCallback((e: any) => {
//     setQuestionValue(e.target.value);
//   }, []);
//
//   const handleChangeAnswer = useCallback((e: any) => {
//     setAnswer(e.target.value);
//   }, []);
//
//   useEffect(() => {
//     if (doneStatus && lessonId) {
//       // setQuizData((old) => [
//       //   ...old,
//       //   { question: questionValue, correct: answer },
//       // ]);
//       const update = async () => {
//         await createAnswer({
//           createAnswerModel: {
//             questionId: currentEditedQuestionId,
//             data: answer,
//             picture: "",
//           },
//         }).then((r) => {
//           updateQuestion({
//             id: currentEditedQuestionId,
//             updateQuestionModel: {
//               lessonId,
//               title: questionValue,
//               description: "test",
//               difficulty: "BEGINNER",
//               picture: "",
//               points: 0,
//               trustAnswerId: r.id,
//             },
//           });
//         });
//       };
//       update();
//       setDoneStatus(false);
//     } else {
//       setQuestionValue("");
//       setAnswer("");
//     }
//   }, [doneStatus, setQuizData]);
//
//   return (
//     <Container>
//       <InputQuestion
//         placeholder="Write your question here..."
//         value={questionValue}
//         onChange={handleChangeQuestionValue}
//       />
//       <TitleCorrect>Correct Answer</TitleCorrect>
//       {typeSelected === "free" && (
//         <InputQuestion
//           value={answer}
//           onChange={handleChangeAnswer}
//           placeholder="The expected response"
//         />
//       )}
//     </Container>
//   );
// }
//
// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//
//   width: 100%;
//   height: 100%;
//   gap: 60px;
//
//   padding: 40px;
//   box-sizing: border-box;
// `;
//
// const InputQuestion = styled.input`
//   width: 800px;
//   height: 40px;
//
//   color: #3d3d3d;
//
//   font-size: 32px;
//   font-style: normal;
//   font-weight: 400;
//   line-height: normal;
//
//   outline: none;
//   border: none;
// `;
//
// const TitleCorrect = styled.h3`
//   margin: 0;
//   color: #088c4a;
// `;
//
// export default Content;
