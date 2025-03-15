import styles from './start_screen.module.css'
interface IStartScreenProps {
  onStart: () => void;
}
const Start_Screen = (props: IStartScreenProps) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Welcom to the React Quiz</h1>
      <p className={styles.description}>
        Test your knowledge of React concepts with this multiple-choice quiz. Answer all questions to see your final
        score.
        <hr />
        You'll get immediate feedback after each question and your final score at the end.
      </p>
      <button onClick={props.onStart} className={styles.startButton}>Start Quiz</button>
    </div>
  )
}

export default Start_Screen;
