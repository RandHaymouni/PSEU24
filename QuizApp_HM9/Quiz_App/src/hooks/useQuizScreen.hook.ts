import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { QuizContext } from "../contexts/QuizContext";

export const useQuizScreen = () => {
  const quizContext = useContext(QuizContext);
  const { questionId } = useParams<{ questionId: string }>();
  const navigate = useNavigate();

  if (!quizContext) {
    throw new Error("QuizContext is undefined");
  }

  const { state, dispatch, quizData } = quizContext;

  const currentQuestionId = questionId ? Number.parseInt(questionId) : 1;
  const question = quizData.length > 0 ? quizData[state.currentQuestionIndex] : null;
  const [time, setTime] = useState(() => {
    return Number(localStorage.getItem("quiz_time")) || 15;
  });

  const isCorrectAnswer = question ? (state.selectedAnswer === question.correctAnswer) : false;

  useEffect(() => {
    if (state.showFeedback) {
      setTime(15);
      localStorage.setItem("quiz_time", "15");
      return;
    }

    const interval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(interval);
          if (!state.showFeedback) {
            dispatch({ type: "SUBMIT_ANSWER" });
          }
          return 0;
        }
        const newTime = prevTime - 1;
        localStorage.setItem("quiz_time", newTime.toString());
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [state.showFeedback, state.currentQuestionIndex, dispatch]);

  const handleSelectAnswer = (option: string) => {
    if (!state.showFeedback) {
      dispatch({ type: "SELECT_ANSWER", payload: option });
    }
  };

  const handleSubmit = () => {
    dispatch({ type: "SUBMIT_ANSWER" });
  };

  const handleNext = () => {
    if (state.currentQuestionIndex + 1 >= quizData.length) {
      navigate("/result");
    } else {
      dispatch({ type: "NEXT_QUESTION" });
      navigate(`/quiz/${currentQuestionId + 1}`);
    }
  };

  return {
    state,
    quizData,
    question,
    time,
    isCorrectAnswer,
    handleSelectAnswer,
    handleSubmit,
    handleNext,
  };
};
