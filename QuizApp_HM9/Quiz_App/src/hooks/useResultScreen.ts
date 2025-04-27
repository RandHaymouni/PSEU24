import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { QuizContext } from "../contexts/QuizContext";

export const useResultScreen = () => {
  const quizContext = useContext(QuizContext);
  const navigate = useNavigate();

  if (!quizContext) {
    throw new Error("QuizContext is undefined");
  }

  const { state, dispatch, quizData } = quizContext;

  const handleRestart = () => {
    dispatch({ type: "RESTART_QUIZ" });
    navigate("/start");
  };

  const percentage = Math.round((state.score / quizData.length) * 100);

  return {
    state,
    quizData,
    percentage,
    handleRestart,
  };
};
