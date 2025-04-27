import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useStartScreen = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<string | null>("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setRole(user.role);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const startQuiz = () => {
    localStorage.setItem("quiz_time", "15");
    navigate("/quiz/1");
  };

  const goToManage = () => {
    navigate("/manage");
  };

  return { role, startQuiz, goToManage };
};
