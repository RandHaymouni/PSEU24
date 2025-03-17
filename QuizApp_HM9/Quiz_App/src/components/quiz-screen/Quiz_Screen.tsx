import styles from './quiz_screen.module.css';
import clock from '../../assets/clock.png';
import { IQuizQuestion } from '../../types/types';
import { useState, useEffect } from 'react';

interface IQuizScreenProps {
    question: IQuizQuestion,
    selectedAnswer: string | null,
    questionNumber: number,
    totalQuestion: number,
    showFeedback: boolean,
    onSelectAnswer: (answer: string) => void,
    onSubmit: () => void,
    onClickNext: () => void,
}

const Quiz_Screen = (props: IQuizScreenProps) => {
    const isCorrentAnswer = props.selectedAnswer === props.question.correctAnswer;
    const [time, setTime] = useState(() => {
        return Number(localStorage.getItem("quiz_time")) || 10
    });

    useEffect(() => {
        console.log("RemainingTime:", time);
        if (props.showFeedback) {
            setTime(10);
            localStorage.setItem("quiz_time", String(10));
            return
        };

        const interval = setInterval(() => {
            setTime((prevTime) => {
                if (prevTime <= 0) {
                    clearInterval(interval)
                    if (!props.showFeedback) {
                        props.onSubmit();
                        console.log("User Not Choose any option!");
                    }
                    return 0;
                }
                const newTime = prevTime - 1;
                localStorage.setItem("quiz_time", newTime.toString());
                return newTime;
            }
            )
        }, 1000);

        return () => {
            clearInterval(interval);
        }
    }, [props.showFeedback, props.questionNumber]);

    return (
        <div className={styles.container}>
            <div className={styles.progressContainer}>
                <div className={styles.questionCounter}>Question {props.questionNumber} of {props.totalQuestion}
                </div>
                <div className={styles.timerCounter}
                    style={{ background: time <= 3 ? "#8f2125" : time <= 6 ? "#d6a32b" : "#ff6b6b33"}}>
                    <img style={{ width: '20px', height: '20px', marginRight: '9px' }} src={clock} alt="clock_image" />
                    Time Left : {time}
                    <hr />
                </div>
            </div>
            <h2 className={styles.question}>{props.question.question}</h2>

            <form onSubmit={(e) => {
                e.preventDefault()
                props.onSubmit();
            }}>
                <div className={styles.optionsContainer}>
                    {props.question.options.map((option, index) => {
                        let optionClass = styles.option

                        if (props.selectedAnswer === option) {
                            optionClass = `${styles.option} ${styles.selected}`
                        }

                        if (props.showFeedback && option === props.question.correctAnswer) {
                            optionClass = `${styles.option} ${styles.correct}`
                        }

                        if (props.showFeedback && props.selectedAnswer === option && option !== props.question.correctAnswer) {
                            optionClass = `${styles.option} ${styles.incorrect}`
                        }

                        return (
                            <div key={index} className={optionClass} onClick={() => { if (!props.showFeedback) props.onSelectAnswer(option) }}>
                                <label className={styles.optionLabel}>
                                    <input
                                        className={styles.radioInput}
                                        type="radio"
                                        value={option}
                                        checked={props.selectedAnswer === option}
                                        onChange={() => props.onSelectAnswer(option)}
                                        disabled={props.showFeedback}
                                    />
                                    <span className={styles.radioControl}></span>
                                    <span className={styles.optionText}>{option}</span>
                                </label>
                            </div>
                        )
                    })}
                </div>

                {props.showFeedback ? (
                    <div className={styles.feedbackContainer}>
                        <div className={isCorrentAnswer ? styles.correctFeedback : styles.incorrectFeedback}>
                            <p>{isCorrentAnswer ? "Correct! Well done." : `InCorrect! The Correct Answer is : ${props.question.correctAnswer}`}</p>
                        </div>
                        <button type="button" onClick={props.onClickNext} className={styles.nextButton}>
                            {props.questionNumber === props.totalQuestion ? "See Results" : "Next Question"}
                        </button>
                    </div>
                ) : (
                    <button
                        type="submit"
                        className={`${styles.submitButton} ${!props.selectedAnswer ? styles.disabled : ""}`}
                    >
                        Submit Answer
                    </button>
                )}

            </form>
        </div>
    );
};

export default Quiz_Screen;
