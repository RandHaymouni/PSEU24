import './App.css'
import StartScreen from './components/start-screen/Start_Screen';
import QuizScreen from './components/quiz-screen/Quiz_Screen';
import ResultScreen from './components/result-screen/Result_Screen';
import quizData from './quizData/quizData'
import { IQuizState } from './types/types'
import quizReducer from './redusers/quizReduser';
import { useReducer, useEffect } from 'react';
function App() {

  const getInitialState = (): IQuizState => {
    const StoreQuizState = localStorage.getItem("quizState");
    return StoreQuizState ? JSON.parse(StoreQuizState) : {
      status: "start",
      currentQuestionIndex: 0,
      userAnswers: [],
      score: 0,
      showFeedback: false,
      selectedAnswer: "",
    };
  };
  // const INITIAL_STATE: IQuizState = {
  //   status: "start",
  //   currentQuestionIndex: 0,
  //   userAnswers: [],
  //   score: 0,
  //   showFeedback: false,
  //   selectedAnswer: null,
  // }

  const [state, dispatch] = useReducer(quizReducer, getInitialState());

  useEffect(() => {
    console.log("Quiz state: ", state);
    localStorage.setItem("quizState", JSON.stringify(state));
  }, [state]);

  return (
    <div className="container">
      <div className="header">
        <h1 className="title">React Quiz</h1>
      </div>
      <div className="content">
        {
          state.status === "start" ?
            <StartScreen onStart={() => dispatch({ type: "START_QUIZ" })} />
            : state.status === "in-progress" ?
              <QuizScreen
                question={quizData[state.currentQuestionIndex]}
                selectedAnswer={state.selectedAnswer}
                questionNumber={state.currentQuestionIndex + 1}
                totalQuestion={quizData.length}
                showFeedback={state.showFeedback}
                onSelectAnswer={(answer: string) => dispatch({ type: "SELECT_ANSWER", payload: answer })}
                onSubmit={() => dispatch({ type: "SUBMIT_ANSWER" })}
                onClickNext={() => dispatch({ type: "NEXT_QUESTION" })}
              />
              :
              <ResultScreen
                score={state.score}
                totalQuestions={quizData.length}
                onRestart={() => dispatch({ type: "RESTART_QUIZ" })}
              />
        }
      </div>
    </div>
  )
}

export default App
