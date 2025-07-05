import React, { useState, useEffect } from "react";
import axios from "axios";
import { db, auth } from "../services/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import challenges from "../data/challenges";

const welcomeChallenge = {
  title: "Welcome to Code Knights",
  description: "Your first quest begins here. Write a simple program that prints: 'Welcome to Code Knights!'",
  task: "Write a program that prints: 'Welcome to Code Knights!'",
  day: 1,
};

const languageMap = {
  python: 71,
  javascript: 63,
  java: 62,
};

const DailyChallenge = () => {
  const [user] = useAuthState(auth);
  const [challenge, setChallenge] = useState(null);
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("python");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [submittedToday, setSubmittedToday] = useState(false);
  const [celebrationMessage, setCelebrationMessage] = useState("");

  useEffect(() => {
    const fetchChallenge = async () => {
      if (!user) return;

      const userRef = doc(db, "users", user.uid);
      const snap = await getDoc(userRef);

      if (snap.exists()) {
        const data = snap.data();
        const streak = data.streak || 0;
        const dayToShow = streak + 1;

        const currentChallenge = challenges[(dayToShow - 1) % challenges.length];
        setChallenge({ ...currentChallenge, day: dayToShow });
      } else {
        setChallenge(welcomeChallenge);
      }
    };

    fetchChallenge();
  }, [user]);

  useEffect(() => {
    const checkSubmission = async () => {
      if (!user) return;
      const userRef = doc(db, "users", user.uid);
      const snap = await getDoc(userRef);
      const today = new Date().toISOString().split("T")[0];
      if (snap.exists() && snap.data().submissions?.[today]) {
        setSubmittedToday(true);
      }
    };
    checkSubmission();
  }, [user]);

  const runCode = async () => {
    if (!code.trim()) return setOutput("⚠️ Please enter your code.");
    setLoading(true);
    try {
      const res = await axios.post(
        "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&wait=true",
        {
          source_code: btoa(code),
          stdin: btoa(input),
          language_id: languageMap[language],
        },
        {
          headers: {
            "content-type": "application/json",
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
            "X-RapidAPI-Key": "52cd792249msh33acae5846c5a3bp190a83jsn259611d1780a",
          },
        }
      );

      const result = res.data;
      if (result.stderr) setOutput(atob(result.stderr));
      else if (result.compile_output) setOutput(atob(result.compile_output));
      else setOutput(atob(result.stdout));
    } catch (error) {
      console.error(error);
      setOutput("❌ Error running code. Check your key or code.");
    }
    setLoading(false);
  };

  const submitCode = async () => {
    if (!user) return alert("Login to submit");

    if (submittedToday) {
      return alert("✅ Already submitted today's challenge.");
    }

    const userRef = doc(db, "users", user.uid);
    const today = new Date().toISOString().split("T")[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];

    try {
      const snap = await getDoc(userRef);
      const userData = snap.exists() ? snap.data() : {};

      const prevStreak = userData.streak || 0;
      const prevXP = userData.xp || 0;
      const lastCompleted = userData.lastCompleted;

      let newStreak = 1;
      let lostStreak = false;

      if (lastCompleted === today) return;
      else if (lastCompleted === yesterday) {
        newStreak = prevStreak + 1;
      } else {
        if (lastCompleted) lostStreak = true;
        newStreak = 1;
      }

      const updatedBadges = Array.from({ length: newStreak }, (_, i) => i + 1);

      await setDoc(
        userRef,
        {
          xp: prevXP + 10,
          streak: newStreak,
          lastCompleted: today,
          badges: updatedBadges,
          submissions: {
            ...userData.submissions,
            [today]: {
              challenge: challenge.title,
              submittedAt: new Date().toISOString(),
              badge: newStreak,
            },
          },
        },
        { merge: true }
      );

      localStorage.setItem("profileRefresh", Date.now());

      setSubmittedToday(true);
      alert("✅ Code submitted! XP gained +10 🎉");
      if (lostStreak) alert("⚠️ You lost your streak. Don’t give up!");

      if (challenge.id === 30) {
        setCelebrationMessage("🎉 You’ve completed 30 challenges and earned the title: **Code Knight Supreme!** 🏆");
      }
    } catch (err) {
      console.error("Submission Error:", err);
      alert("❌ Submission failed.");
    }
  };

  if (!challenge) return <div className="text-center text-white mt-10">Loading...</div>;

  return (
    <div className="pt-24 px-4 text-white min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] font-mono">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-pink-400">Daily Challenge</h1>
        <p className="mb-2 text-xl text-yellow-300 font-semibold">{challenge.title}</p>
        <p className="mb-4 text-lg">{challenge.description}</p>

        {celebrationMessage && (
          <div className="bg-green-900 border border-green-500 rounded-lg p-4 mb-6 text-green-200 font-semibold shadow-lg">
            {celebrationMessage}
          </div>
        )}

        {challenge.task && (
          <div className="mb-6 p-4 bg-gray-800 border border-gray-600 rounded">
            <h2 className="text-lg font-bold text-cyan-300 mb-2">🛠️ What You Need to Do:</h2>
            <p className="text-white">{challenge.task}</p>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <textarea
              rows={15}
              className="w-full p-3 rounded bg-gray-900 border border-gray-600 text-sm resize-none"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Write your code here..."
            ></textarea>
          </div>

          <div>
            <label className="block mb-1 font-semibold text-teal-300">Input</label>
            <textarea
              rows={5}
              className="w-full p-3 mb-4 rounded bg-gray-900 border border-gray-600 text-sm resize-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Custom input (optional)"
            ></textarea>

            <label className="block mb-1 font-semibold text-purple-300">Output</label>
            <div className="bg-black text-lime-400 p-3 rounded min-h-[100px] overflow-auto border border-gray-700 text-sm">
              {loading ? "⏳ Running..." : output}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-6">
          <select
            className="bg-gray-800 text-white px-3 py-2 rounded border border-gray-600"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            {Object.keys(languageMap).map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>

          <button
            onClick={runCode}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded"
            disabled={loading}
          >
            Run Code
          </button>

          <button
            onClick={submitCode}
            className={`${
              submittedToday
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            } text-white font-semibold px-4 py-2 rounded`}
            disabled={submittedToday}
          >
            {submittedToday ? "Submitted ✅" : "Submit Code"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DailyChallenge;
