import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import type { IQuizQuestion } from "../../types/types"
import getQuizData from "../../utils/getQuizData"
import styles from "./insertQuestion_screen.module.css"

const InsertQuestionScreen = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index?: number) => {
    const { name, value } = e.target;

    if (name === "question") {
      setQuestion(value)
    } else if (name.startsWith("option")) {
      const updatedOptions = [...options];
      updatedOptions[index!] = value;
      setOptions(updatedOptions);

      if (correctAnswer === options[index!]) {
        setCorrectAnswer(value);
      }
    }
  }

  const handleCorrectAnswerSelect = (optionIndex: number) => {
    setCorrectAnswer(options[optionIndex])
  }

  const handleSubmit = () => {
    // Validation
    if (!question.trim()) {
      setError("Question is required")
      return
    }

    if (options.some((opt) => !opt.trim())) {
      setError("All options are required")
      return
    }

    if (!correctAnswer) {
      setError("Please select a correct answer")
      return
    }

    const newQuestion: IQuizQuestion = {
      question,
      options,
      correctAnswer,
    }

    const existingQuestions = getQuizData();
    const updatedQuestions = [...existingQuestions, newQuestion];
    localStorage.setItem("quizData", JSON.stringify(updatedQuestions));
    navigate("/manage");
  }

  const goBack = () => {
    navigate("/manage");
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.heading}>Insert New Question</h2>
      </div>

      <div className={styles.formContainer}>
        <form onSubmit={(e) => e.preventDefault()}>
          {error && <div className={styles.error}>{error}</div>}

          <div className={styles.inputGroup}>
            <label htmlFor="question">Question:</label>
            <input
              id="question"
              type="text"
              name="question"
              value={question}
              onChange={(e) => handleInputChange(e)}
              placeholder="Enter the question"
              className="QuestionInpt"
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Options:</label>
            {options.map((option, index) => (
              <div key={index} className={styles.optionInput}>
                <input
                  type="text"
                  name={`option${index}`}
                  value={option}
                  onChange={(e) => handleInputChange(e, index)}
                  placeholder={`Option ${index + 1}`}
                />
                <div className={styles.radioContainer}>
                  <input
                    type="radio"
                    id={`correct-${index}`}
                    name="correctOption"
                    checked={correctAnswer === option}
                    onChange={() => handleCorrectAnswerSelect(index)}
                    className={styles.radioInput}
                  />
                  <label htmlFor={`correct-${index}`} className={styles.radioLabel}>
                    Correct Answer
                  </label>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.buttonGroup}>
            <button type="button" onClick={goBack} className={styles.cancelButton}>
              Cancel
            </button>
            <button type="button" onClick={handleSubmit} className={styles.submitButton}>
              Submit Question
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default InsertQuestionScreen
