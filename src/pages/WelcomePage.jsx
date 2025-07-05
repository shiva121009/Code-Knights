import { Link } from "react-router-dom";

const WelcomePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-cyberBlue text-white px-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-cyberPink animate-pulse">
          👑 Welcome, Code Knight!
        </h1>
        <p className="text-lg md:text-xl mb-8 leading-relaxed">
          Enter the realm where your code becomes your sword. <br />
          Master challenges, earn XP, and rise through the ranks — one day at a time.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/login"
            className="bg-cyberPink hover:bg-cyberBlue text-white px-6 py-3 rounded-full text-lg font-semibold transition shadow-lg"
          >
            Start Coding
          </Link>
          <Link
            to="/leaderboard"
            className="bg-gradient-to-r from-cyberBlue to-cyberPink px-6 py-3 rounded-full text-white font-semibold hover:opacity-90 transition shadow-lg"
          >
            View Leaderboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
