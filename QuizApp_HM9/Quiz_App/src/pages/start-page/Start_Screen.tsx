import styles from "./start_screen.module.css";
import { useStartScreen } from "../../hooks/useStartScreen";

const Start_Screen = () => {
  const { role, startQuiz, goToManage } = useStartScreen();

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Welcome to the React Quiz</h1>
      <p className={styles.description}>
        Test your knowledge of React concepts with this multiple-choice quiz. Answer all questions to see your final
        score.
        <hr />
        You'll get immediate feedback after each question and your final score at the end.
      </p>

      {role === "admin" ? (
        <div>
          <button onClick={goToManage} className={styles.startButton}>
            Manage Questions
          </button>
          <button onClick={startQuiz} className={styles.startButton}>
            Start Quiz
          </button>
        </div>
      ) : (
        <button onClick={startQuiz} className={styles.startButton}>
          Start Quiz
        </button>
      )}
    </div>
  );
};

export default Start_Screen;
