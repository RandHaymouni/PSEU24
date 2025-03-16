import styles from './result_screen.module.css';
interface IResultScreenProps {
    score: number
    totalQuestions: number
    onRestart: () => void
}
const Result_Screen = (props: IResultScreenProps) => {
    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>Quiz Results</h2>

            <div className={styles.scoreCard}>
                <div >
                    <span className={styles.scoreValue}>{props.score} / {props.totalQuestions}</span>
                </div>

                <div className={styles.feedback}>
                    {props.score >= 8 ? (
                        <p className={styles.excellentFeedback}>Excellent! You really know the React!</p>
                    ) : props.score >= 5 ? (
                        <p className={styles.goodFeedback}>Good job! You have a solid understanding of React.</p>
                    ) : (
                        <p className={styles.improveFeedback}>Keep learning! React takes practice.</p>
                    )}
                </div>
            </div>

            <button onClick={props.onRestart} className={styles.restartButton}>
                Restart Quiz
            </button>
        </div>
    )
}

export default Result_Screen;
