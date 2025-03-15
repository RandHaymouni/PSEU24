import { IQuizState } from "../types/types";
import { IQuizAction } from "../types/types";
import quizData from "../quizData/quizData";

const quizReducer = (state: IQuizState, action: IQuizAction): IQuizState => {
    console.log("Action:", action.type, "Current state:", state)

    switch (action.type) {
        case "START_QUIZ":
            return {
                ...state,
                status: "in-progress",
            }

        case "SELECT_ANSWER":
            return {
                ...state,
                selectedAnswer: action.payload || "",
            }

        case "SUBMIT_ANSWER":
            const currentQuestion = quizData[state.currentQuestionIndex];
            const isCorrect = state.selectedAnswer === currentQuestion.correctAnswer;

            console.log("Answer Selected:",
                `selected: ${state.selectedAnswer},
                 correct: ${currentQuestion.correctAnswer},
                 is correct answer:${isCorrect}`);

            return {
                ...state,
                showFeedback: true,
                score: isCorrect ? state.score + 1 : state.score,
            }

        case "NEXT_QUESTION":
            const newAnswers = [...state.userAnswers];
            newAnswers[state.currentQuestionIndex] = state.selectedAnswer || "";

            const isLastQuestion = state.currentQuestionIndex === quizData.length - 1;

            return {
                ...state,
                currentQuestionIndex: state.currentQuestionIndex + 1,
                userAnswers: newAnswers,
                status: isLastQuestion ? "complete" : state.status,
                showFeedback: false,
                selectedAnswer: null,
            }

        case "RESTART_QUIZ":
            return {
                status: "start",
                currentQuestionIndex: 0,
                userAnswers: [],
                score: 0,
                showFeedback: false,
                selectedAnswer: null,
            }

        default:
            return state;
    }
}
export default quizReducer;
