import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { auth } from "./services/firebase";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import DailyChallenge from "./pages/DailyChallenge";
import Profile from "./pages/Profile";
import Leaderboard from "./pages/Leaderboard";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "⚔️ Code Knights 🛡️";
    const unsub = auth.onAuthStateChanged((u) => {
      setUser(u);
      setLoading(false);
    });
    return unsub;
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <Router>
      {user && <Navbar />}
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/signup" element={user ? <Navigate to="/" /> : <Signup />} />
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route path="/daily-challenge" element={user ? <DailyChallenge /> : <Navigate to="/login" />} />
        <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/leaderboard" element={user ? <Leaderboard /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
      </Routes>
    </Router>
  );
}
