import { useState } from "react";
import { auth } from "../services/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      setError("Access Denied. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-cyberBlue text-white font-mono relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none text-green-400 text-[10px] leading-snug whitespace-pre-wrap font-mono overflow-hidden">
        {Array(120)
          .fill("101010001110100101010101011001010110101010101010100101")
          .join("\n")}
      </div>

      <form
        onSubmit={handleLogin}
        className="z-10 bg-black/80 backdrop-blur-sm p-10 rounded-xl w-full max-w-md border border-cyberBlue shadow-xl"
      >
        <h2 className="text-4xl font-extrabold mb-6 text-center text-cyberBlue tracking-widest">
          Code Knights Login
        </h2>

        <p className="text-sm text-zinc-400 mb-6 text-center">
          Authenticate to begin your quest.
        </p>

        {error && (
          <p className="text-red-500 mb-4 text-center text-sm">{error}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded-lg mb-4 bg-zinc-900 border border-zinc-600 text-cyberGreen placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-cyberBlue"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded-lg mb-6 bg-zinc-900 border border-zinc-600 text-cyberGreen placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-cyberBlue"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-cyberBlue to-cyberPink py-3 rounded-lg font-bold text-white text-lg transition hover:opacity-90 shadow-lg"
        >
          Enter the Code Realm
        </button>

        <p className="text-center mt-6 text-sm text-zinc-300">
          New to Code Knights?{" "}
          <Link
            to="/signup"
            className="text-cyberPink underline hover:text-cyberBlue"
          >
            Create an account
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
