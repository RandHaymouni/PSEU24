export interface IQuizQuestion {
    id: number;
    question: string;
    options: string[];
    correctAnswer: string;
}
export interface IQuizState {
    status: "start" | "in-progress" | "complete";
    currentQuestionIndex: number;
    userAnswers: string[];
    score: number;
    showFeedback: boolean;
    selectedAnswer: string | null;
}
export interface IQuizAction {
    type: string;
    payload?: string;
}