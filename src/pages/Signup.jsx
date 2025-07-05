import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../services/firebase"; // ✅ updated path
import { useNavigate, Link } from "react-router-dom";


const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      const today = new Date().toISOString().split("T")[0];

      // Initialize new user profile with streak, XP, badge, and submission
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        streak: 1,
        xp: 10,
        lastCompleted: today,
        badges: [1], // 🥇 Novice’s Dawn
        submissions: {
          [today]: {
            challenge: "Welcome to Code Knights!",
            submittedAt: new Date().toISOString(),
            badge: 1,
          },
        },
      });

      alert("🎉 Welcome to Code Knights! Your quest begins today with Day 1 🛡️");
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-cyberBlue text-white font-mono relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none text-green-400 text-[10px] leading-snug whitespace-pre-wrap font-mono overflow-hidden">
        {Array(120)
          .fill("101001010110101011010010101010101011001010110110101")
          .join("\n")}
      </div>

      <form
        onSubmit={handleSignup}
        className="z-10 bg-black/80 backdrop-blur-sm p-10 rounded-xl w-full max-w-md border border-cyberPink shadow-2xl"
      >
        <h2 className="text-4xl font-extrabold mb-6 text-center text-cyberPink tracking-widest animate-pulse">
          🧙‍♂️ Join the Code Knights
        </h2>

        <p className="text-sm text-zinc-400 mb-6 text-center">
          Forge your identity in the realm of code ⚔️
        </p>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <input
          type="email"
          placeholder="🧾 Enter your email"
          className="w-full p-3 rounded-lg mb-4 bg-zinc-900 border border-zinc-600 text-cyberGreen placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-cyberBlue"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="🔒 Choose a secret passcode"
          className="w-full p-3 rounded-lg mb-6 bg-zinc-900 border border-zinc-600 text-cyberGreen placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-cyberBlue"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-cyberBlue to-cyberPink py-3 rounded-lg font-bold text-white text-lg transition hover:opacity-90 shadow-lg"
        >
          🚀 Enlist in the Realm
        </button>

        <p className="text-center mt-6 text-sm text-zinc-300">
          Already a Knight?{" "}
          <Link
            to="/login"
            className="text-cyberPink underline hover:text-cyberBlue transition"
          >
            Return to Gate 🛡️
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
