import styles from "./manageQuestions_screen.module.css";
import { useManageQuestions } from "../../hooks/useManageQuestions.hook";

const ManageQuestionsScreen = () => {
  const { questions, deleteQuestion, goToEdit, goBack, goToInsert } = useManageQuestions();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={goBack}>
          ◀ Back
        </button>
        <h2 className={styles.heading}>Manage Questions</h2>
      </div>

      <button className={styles.addButton} onClick={goToInsert}>
        <span>➕</span> Add New Question
      </button>

      <div className={styles.questionsContainer}>
        {questions.length === 0 ? (
          <p className={styles.noQuestions}>No questions available.</p>
        ) : (
          <ul className={styles.questionList}>
            {questions.map((q, idx) => (
              <li key={idx} className={styles.questionItem}>
                <div className={styles.questionText}>
                  <strong>Question {idx + 1}:</strong> {q.question}
                </div>
                <div className={styles.controls}>
                  <button onClick={() => goToEdit(idx)} className={styles.editBtn}>
                    Edit
                  </button>
                  <button onClick={() => deleteQuestion(idx)} className={styles.deleteBtn}>
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ManageQuestionsScreen;
