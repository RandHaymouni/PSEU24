import React, { createContext, useReducer, useEffect, useState } from 'react';
import { IQuizState, IQuizAction, IQuizQuestion } from '../types/types';
import quizReducer from '../redusers/quizReduser';
import getQuizData from '../utils/getQuizData';

interface QuizContextType {
    state: IQuizState;
    dispatch: React.Dispatch<IQuizAction>;
    quizData: IQuizQuestion[];
}

export const QuizContext = createContext<QuizContextType | undefined>(undefined);

const initialState: IQuizState = {
    status: "start",
    currentQuestionIndex: 0,
    userAnswers: [],
    score: 0,
    showFeedback: false,
    selectedAnswer: "",
};

const QuizProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoading, setIsLoading] = useState(true); 

    const getInitialState = (): IQuizState => {
        const storedQuizState = localStorage.getItem("quizState");
        try {
            return storedQuizState ? JSON.parse(storedQuizState) : initialState;
        } catch (error) {
            console.error("Error parsing quizState from localStorage:", error);
            return initialState; 
        }
    };

    const [state, dispatch] = useReducer(quizReducer, getInitialState());
    const [quizData, setQuizData] = useState<IQuizQuestion[]>([]);

    useEffect(() => {
        const storedQuizData = localStorage.getItem("quizData");
        if (storedQuizData) {
            setQuizData(JSON.parse(storedQuizData)); 
            setIsLoading(false); 
        } else {
            const data = getQuizData();
            setQuizData(data);
            localStorage.setItem("quizData", JSON.stringify(data));
            setIsLoading(false); 
        }
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem("quizState", JSON.stringify(state));
        } catch (error) {
            console.error("Error saving quizState to localStorage:", error);
        }
    }, [state]);

    if (isLoading) {
        return <div>Loading Questions...</div>; 
    }

    return (
        <QuizContext.Provider value={{ state, dispatch, quizData }}>
            {children}
        </QuizContext.Provider>
    );
};

export default QuizProvider;
