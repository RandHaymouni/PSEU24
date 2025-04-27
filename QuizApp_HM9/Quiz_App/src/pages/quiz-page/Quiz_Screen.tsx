import { useQuizScreen } from "../../hooks/useQuizScreen.hook"; // تأكد من استيراد hook الخاص بك
import styles from './quiz_screen.module.css';
import clock from '../../assets/clock.png';

const Quiz_Screen = () => {
    const {
        state,
        quizData,
        question,
        time,
        isCorrectAnswer,
        handleSelectAnswer,
        handleSubmit,
        handleNext,
    } = useQuizScreen(); 

    if (!quizData || quizData.length === 0) {
        return <div>Loading Questions...</div>;
    }

    const currentIndex = state.currentQuestionIndex < quizData.length ? state.currentQuestionIndex : quizData.length - 1;

    if (!question) {
        return <div>Question not found.</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.progressContainer}>
                <div className={styles.questionCounter}>
                    Question {currentIndex + 1} of {quizData.length}
                </div>
                <div
                    className={styles.timerCounter}
                    style={{
                        background: time <= 3 ? "#8f2125" :
                            time <= 6 ? "#d6a32b" :
                                "#ff6b6b33",
                    }}
                >
                    <img style={{ width: '20px', height: '20px', marginRight: '9px' }} src={clock} alt="clock_image" />
                    Time Left: {time}
                </div>
            </div>

            <h2 className={styles.question}>{question.question}</h2>

            <form onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
            }}>
                <div className={styles.optionsContainer}>
                    {question.options.map((option, index) => {
                        let optionClass = styles.option;

                        if (state.selectedAnswer === option) {
                            optionClass = `${styles.option} ${styles.selected}`;
                        }

                        if (state.showFeedback && option === question.correctAnswer) {
                            optionClass = `${styles.option} ${styles.correct}`;
                        }

                        if (state.showFeedback && state.selectedAnswer === option && option !== question.correctAnswer) {
                            optionClass = `${styles.option} ${styles.incorrect}`;
                        }

                        return (
                            <div
                                key={index}
                                className={optionClass}
                                onClick={() => handleSelectAnswer(option)}
                            >
                                <label className={styles.optionLabel}>
                                    <input
                                        className={styles.radioInput}
                                        type="radio"
                                        value={option}
                                        checked={state.selectedAnswer === option}
                                        onChange={() => handleSelectAnswer(option)}
                                        disabled={state.showFeedback}
                                    />
                                    <span className={styles.radioControl}></span>
                                    <span className={styles.optionText}>{option}</span>
                                </label>
                            </div>
                        );
                    })}
                </div>

                {state.showFeedback ? (
                    <div className={styles.feedbackContainer}>
                        <div className={isCorrectAnswer ? styles.correctFeedback : styles.incorrectFeedback}>
                            <p>{isCorrectAnswer ? "Correct! Well done." : `Incorrect! The correct answer is: ${question.correctAnswer}`}</p>
                        </div>
                        <button type="button" onClick={handleNext} className={styles.nextButton}>
                            {state.currentQuestionIndex + 1 === quizData.length ? "See Results" : "Next Question"}
                        </button>
                    </div>
                ) : (
                    <button
                        type="submit"
                        className={`${styles.submitButton} ${!state.selectedAnswer ? styles.disabled : ""}`}
                        disabled={!state.selectedAnswer}
                    >
                        Submit Answer
                    </button>
                )}
            </form>
        </div>
    );
};

export default Quiz_Screen;
