import defaultQuizData from '../quizData/quizData';
import { IQuizQuestion } from '../types/types';

const getQuizData = (): IQuizQuestion[] => {
  const stored = localStorage.getItem("quizData");
  return stored ? JSON.parse(stored) : defaultQuizData;
};
export default getQuizData;