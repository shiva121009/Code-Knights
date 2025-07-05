import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const welcome = "Welcome, Code Knight";
  const [display, setDisplay] = useState("");

  useEffect(() => {
    document.title = "⚔️ Code Knights 🛡️"; // ✅ Set tab title

    let i = 0;
    const timer = setInterval(() => {
      setDisplay(welcome.slice(0, i++));
      if (i > welcome.length) clearInterval(timer);
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-br from-blue-800 via-green-600 to-purple-700">
      <div className="mb-4 text-7xl flex items-center gap-4">
        <span>🛡️</span>
        <h1 className="text-4xl font-bold text-white uppercase">{display}</h1>
        <span>🗡️</span>
      </div>
      <div className="bg-gray-900 bg-opacity-60 rounded-lg p-4 shadow-lg w-full max-w-md mb-6">
        <pre className="font-mono text-green-300">// Ready to start your coding quest?</pre>
      </div>
      <Link to="/daily-challenge" className="btn-submit px-8 py-4 text-lg shadow-lg">
        Start Your Quest
      </Link>
    </div>
  );
}
