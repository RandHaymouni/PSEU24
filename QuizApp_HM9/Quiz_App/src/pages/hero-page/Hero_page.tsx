import { useNavigate } from 'react-router-dom';
import styles from './hero_page.module.css';

const HeroPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>Enhance Your React Skills</h1>
        <p className={styles.subtitle}>
          Take our interactive React quiz to test and improve your knowledge. Whether you're a beginner or an experienced developer, this quiz will help reinforce your React skills.
        </p>
        <p className={styles.note}>
          Please log in to start the quiz.
        </p>
        <button className={styles.button} onClick={handleLogin}>
          Login to Start Quiz
        </button>
      </div>
    </section>
  );
};

export default HeroPage;
