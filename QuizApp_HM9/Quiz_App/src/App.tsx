import "./App.css";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import QuizProvider, { QuizContext } from '../src/contexts/QuizContext';
import ProtectedRoute from "./components/guards/Guard"
import HeroPage from "./pages/hero-page/Hero_page";
import StartPage from "./pages/start-page/Start_Screen";
import QuizPage from "./pages/quiz-page/Quiz_Screen";
import ResultPage from "./pages/result-page/Result_Screen";
import LoginPage from "./pages/login-page/Login_Screen";
import ManageQuizPage from "./pages/manage-page/ManageQuestions_Screen";
import InsertQuestionPage from "./components/insert-screen/InsertQuestion_Screen";
import EditQuestionPage from "./components/edit-screen/Edit_Screen"

function App() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedData = localStorage.getItem("quizData");
    if (!storedData) {
        console.error("Quiz data not found in localStorage");
    }
}, []);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    }
    else {
      setIsLoggedIn(false);
      navigate("/");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <QuizProvider>
      <div className="container">
        <div className="header">
          <h1 className="title">React Quiz</h1>
          {isLoggedIn && (
            <button className="logoutButton" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>

        <div className="content">
          <Routes>
            <Route path="/" element={<HeroPage />} />
            <Route path="/start" element={<StartPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/manage"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <ManageQuizPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/insert"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <InsertQuestionPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit/:id"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <EditQuestionPage />
                </ProtectedRoute>
              }
            />
            <Route path="/quiz/:questionId"
              element={<QuizPage />
              }
            />
            <Route path="/result"
              element={<ResultPage />
              }
            />
            <Route path="*" element={<Navigate to="/start" />} />
          </Routes>
        </div>
      </div>
    </QuizProvider>
  )
}

export default App