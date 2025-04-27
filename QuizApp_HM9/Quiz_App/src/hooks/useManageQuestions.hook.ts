import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import getQuizData from "../utils/getQuizData";
import type { IQuizQuestion } from "../types/types";

export const useManageQuestions = () => {
    const [questions, setQuestions] = useState<IQuizQuestion[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        setQuestions(getQuizData());
    }, []);

    useEffect(() => {
        localStorage.setItem("quizData", JSON.stringify(questions));
    }, [questions]);
    
    const deleteQuestion = (index: number) => {
        const updated = [...questions];
        updated.splice(index, 1);
        setQuestions(updated);
        localStorage.setItem("quizData", JSON.stringify(updated));
    };

    const goToEdit = (index: number) => {
        navigate(`/edit/${index}`);
    };

    const goBack = () => {
        navigate("/start");
    };

    const goToInsert = () => {
        navigate("/insert");
    };

    return {
        questions,
        deleteQuestion,
        goToEdit,
        goBack,
        goToInsert,
    };
};
