import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import styles from "./edit_screen.module.css"
import type { IQuizQuestion } from "../../types/types"
import getQuizData from "../../utils/getQuizData"

const EditQuestionScreen = () => {
  const { id } = useParams<{ id: string }>();
  const questionIndex = id ? Number.parseInt(id) : 1;
  const navigate = useNavigate();

  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState<string[]>(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState<string>("");
  const [error, setError] = useState("");

  useEffect(() => {
    const quizData = getQuizData();

    if (questionIndex >= 0 && questionIndex < quizData.length) {
      const currentQuestion = quizData[questionIndex];
      setQuestion(currentQuestion.question);
      setOptions([...currentQuestion.options]);
      setCorrectAnswer(currentQuestion.correctAnswer);
    } else {
      setError("Question not found");
    }
  }, [questionIndex])

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!question.trim()) {
      setError("Question is required");
      return;
    }

    if (options.some((opt) => !opt.trim())) {
      setError("All options are required");
      return;
    }

    if (!correctAnswer) {
      setError("Please select a correct answer");
      return;
    }

    const quizData = getQuizData();

    if (questionIndex >= 0 && questionIndex < quizData.length) {
      const updatedQuestion: IQuizQuestion = {
        question,
        options,
        correctAnswer,
      }

      quizData[questionIndex] = updatedQuestion;
      localStorage.setItem("quizData", JSON.stringify(quizData));
      navigate("/manage");
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.heading}>Edit Question</h2>
      </div>

      <div className={styles.card}>
        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="question" className={styles.label}>
              Question
            </label>
            <textarea
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className={styles.textarea}
              placeholder="Enter your question here"
            />
          </div>

          <div className={styles.optionsContainer}>
            <h3 className={styles.optionsHeading}>Options</h3>

            {options.map((option, index) => (
              <div key={index} className={styles.optionGroup}>
                <div className={styles.optionHeader}>
                  <label htmlFor={`option-${index}`} className={styles.optionLabel}>
                    Option {index + 1}
                  </label>
                  <div className={styles.radioContainer}>
                    <input
                      type="radio"
                      id={`correct-${index}`}
                      name="correctAnswer"
                      checked={correctAnswer === option}
                      onChange={() => setCorrectAnswer(option)}
                      className={styles.radioInput}
                    />
                    <label htmlFor={`correct-${index}`} className={styles.radioLabel}>
                      Correct Answer
                    </label>
                  </div>
                </div>
                <input
                  id={`option-${index}`}
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  className={styles.input}
                  placeholder={`Option ${index + 1}`}
                />
              </div>
            ))}
          </div>

          <div className={styles.buttonGroup}>
            <button type="button" onClick={() => navigate("/manage")} className={styles.cancelButton}>
              Cancel
            </button>
            <button type="submit" className={styles.saveButton}>
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditQuestionScreen
