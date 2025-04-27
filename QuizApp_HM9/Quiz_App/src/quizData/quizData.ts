import { IQuizQuestion } from "../types/types";

const quizData: IQuizQuestion[] = [
  {
    // id: 1,
    question: "What is React?",
    options: ["A database", "A JavaScript library", "A programming language", "A CSS framework"],
    correctAnswer: "A JavaScript library",
  },
  {
    // id: 2,
    question: "Which company developed React?",
    options: ["Google", "Microsoft", "Facebook (Meta)", "Amazon"],
    correctAnswer: "Facebook (Meta)",
  },
  {
    // id: 3,
    question: "Which method is used to update the state in a functional component?",
    options: ["setState", "updateState", "useState", "changeState"],
    correctAnswer: "useState",
  },
  {
    // id: 4,
    question: "What is the default language used in React for writing components?",
    options: ["HTML", "CSS", "JSX", "Python"],
    correctAnswer: "JSX",
  },
  {
    // id: 5,
    question: "What is a React component?",
    options: [
      "A function or class that returns UI elements",
      "A CSS file",
      "A database query",
      "A server request",
    ],
    correctAnswer: "A function or class that returns UI elements",
  },
  {
    // id: 6,
    question: "How do you add a class to an element in JSX?",
    options: ["class", "className", "style", "elementClass"],
    correctAnswer: "className",
  },
  {
    // id: 7,
    question: "What is the purpose of the 'key' prop in lists?",
    options: [
      "To style list items",
      "To improve performance by helping React identify items",
      "To create unique components",
      "To store component state",
    ],
    correctAnswer: "To improve performance by helping React identify items",
  },
  {
    // id: 8,
    question: "How do you handle events in React?",
    options: [
      "By using inline event handlers",
      "By adding event listeners directly to the DOM",
      "By using event handlers as props",
      "Both A and C",
    ],
    correctAnswer: "Both A and C",
  },
  {
    // id: 9,
    question: "Which event fires when a user clicks a button in React?",
    options: ["onHover", "onClick", "onChange", "onPress"],
    correctAnswer: "onClick",
  },
  {
    // id: 10,
    question: "What should be wrapped around multiple components to avoid adding unnecessary div elements?",
    options: ["<div>", "<span>", "<section>", "<React.Fragment>"],
    correctAnswer: "<React.Fragment>",
  },
];
export default quizData;