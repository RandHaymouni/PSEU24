import styles from './result_screen.module.css';
import { useResultScreen } from '../../hooks/useResultScreen';

const Result_Screen = () => {
    const { state, quizData, percentage, handleRestart } = useResultScreen();

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>Quiz Results</h2>

            <div className={styles.scoreCard}>
                <div>
                    <span className={styles.scoreValue}>{state.score} / {quizData.length}</span>
                </div>

                <div className={styles.percentageContainer}>
                    <div className={styles.percentageBar}>
                        <div
                            className={styles.percentageFill}
                            style={{
                                width: `${percentage}%`,
                                background: percentage < 50 ? "#8f2125" :
                                    percentage <= 60 ? "#d6a32b" :
                                        "linear-gradient(90deg, #ff6b6b, #ff8e53)"
                            }}
                        />
                    </div>
                    <span className={styles.percentageValue}>{percentage}%</span>
                </div>

                <div className={styles.feedback}>
                    {state.score >= 8 ? (
                        <p className={styles.excellentFeedback}>Excellent! You really know React!</p>
                    ) : state.score >= 5 ? (
                        <p className={styles.goodFeedback}>Good job! You have a solid understanding of React.</p>
                    ) : (
                        <p className={styles.improveFeedback}>Keep learning! React takes practice.</p>
                    )}
                </div>
            </div>

            <div className={styles.buttonsCon}>
                <button onClick={handleRestart} className={styles.restartButton}>
                    Back To Home
                </button>
                <button onClick={handleRestart} className={styles.restartButton}>
                    Restart Quiz
                </button>
            </div>
        </div>
    );
};

export default Result_Screen;
