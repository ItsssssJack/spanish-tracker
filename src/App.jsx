import { useState, useEffect } from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { DUMMY_CREDENTIALS } from "./data/learningPlan";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [dailyData, setDailyData] = useState(() => {
    const saved = localStorage.getItem("spanishTrackerData");
    return saved ? JSON.parse(saved) : [];
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

  const calculateStreaks = (data) => {
    let streak = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i].completed) {
        streak++;
      } else {
        streak = 0;
      }
      data[i].streak = streak;
    }
    return data;
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
      const sorted = newData.sort((a, b) => a.day - b.day);
      return calculateStreaks(sorted);
    });
  };

  const handleRemoveDay = (dayToDelete) => {
    setDailyData((prev) => {
      const newData = prev.filter((d) => d.day !== dayToDelete);
      const sorted = newData.sort((a, b) => a.day - b.day);
      return calculateStreaks(sorted);
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
      onRemoveDay={handleRemoveDay}
      onLogout={handleLogout}
    />
  );
}

export default App;
