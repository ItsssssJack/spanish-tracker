import { useState, useEffect } from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { generateMockData, DUMMY_CREDENTIALS } from "./data/learningPlan";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [dailyData, setDailyData] = useState(() => {
    const saved = localStorage.getItem("spanishTrackerData");
    return saved ? JSON.parse(saved) : generateMockData(18);
  });

  useEffect(() => {
    localStorage.setItem("spanishTrackerData", JSON.stringify(dailyData));
  }, [dailyData]);

  const handleLogin = (email, password) => {
    if (
      email === DUMMY_CREDENTIALS.email &&
      password === DUMMY_CREDENTIALS.password
    ) {
      setTransitioning(true);
      setTimeout(() => {
        setIsLoggedIn(true);
        setTransitioning(false);
      }, 600);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleLogDay = (logEntry) => {
    setDailyData((prev) => {
      const newData = [...prev];
      const existingIndex = newData.findIndex((d) => d.day === logEntry.day);
      if (existingIndex >= 0) {
        newData[existingIndex] = logEntry;
      } else {
        newData.push(logEntry);
      }
      // Recalculate streaks
      let streak = 0;
      for (let i = 0; i < newData.length; i++) {
        if (newData[i].completed) {
          streak++;
        } else {
          streak = 0;
        }
        newData[i].streak = streak;
      }
      return newData.sort((a, b) => a.day - b.day);
    });
  };

  if (!isLoggedIn) {
    return (
      <Login
        onLogin={handleLogin}
        transitioning={transitioning}
      />
    );
  }

  return (
    <Dashboard
      dailyData={dailyData}
      onLogDay={handleLogDay}
      onLogout={handleLogout}
    />
  );
}

export default App;
