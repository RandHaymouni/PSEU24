import { IQuizState } from "../types/types";
import { IQuizAction } from "../types/types";
import getQuizData from "../utils/getQuizData";

const quizReducer = (state: IQuizState, action: IQuizAction): IQuizState => {
    console.log("Action:", action.type, "Current state:", state);

    const quizData = getQuizData();

    switch (action.type) {
        case "START_QUIZ":
            return {
                ...state,
                status: "in-progress",
            };

        case "SELECT_ANSWER":
            return {
                ...state,
                selectedAnswer: action.payload || "",
            };

        case "SUBMIT_ANSWER":
            const currentQuestion = quizData[state.currentQuestionIndex];
            const isCorrect = state.selectedAnswer === currentQuestion.correctAnswer;
            const newAnswers = [...state.userAnswers];
            newAnswers[state.currentQuestionIndex] = state.selectedAnswer || "";
            const scoree = isCorrect ? state.score + 1 : state.score;
            console.log("Answer Selected:",
                `selected: ${state.selectedAnswer},
                 correct: ${currentQuestion.correctAnswer},
                 is correct answer:${isCorrect},
                 score:${scoree},
                 currentIndex:${state.currentQuestionIndex}`);

            return {
                ...state,
                userAnswers: newAnswers,
                showFeedback: true,
                score: scoree,
            };

        case "NEXT_QUESTION":
            const nextIndex = state.currentQuestionIndex + 1;
            console.log(nextIndex + " HI");

            if (nextIndex < quizData.length) {
                return {
                    ...state,
                    currentQuestionIndex: nextIndex,
                    showFeedback: false,
                    selectedAnswer: null,
                };
            } else {
                return {
                    ...state,
                    status: "complete",
                    showFeedback: false,
                    selectedAnswer: null,
                    currentQuestionIndex: 0, 
                };
            }

        case "RESTART_QUIZ":
            return {
                status: "start",
                currentQuestionIndex: 0, 
                userAnswers: [], 
                score: 0, 
                showFeedback: false, 
                selectedAnswer: null,
            };

        case "ADD_QUESTION":
            const currentData = localStorage.getItem("quizData");
            const quizDataArray = currentData ? JSON.parse(currentData) : quizData;

            const updatedQuizData = [...quizDataArray, action.payload];
            localStorage.setItem("quizData", JSON.stringify(updatedQuizData));

            return {
                ...state,
                status: "start", 
            };

        default:
            return state;
    }
};



export default quizReducer;