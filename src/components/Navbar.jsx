import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../services/firebase";
import { signOut } from "firebase/auth";

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="bg-gray-900 text-white px-4 py-3 font-mono shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="w-full flex justify-between items-center space-x-4">
          <Link
            to="/daily-challenge"
            className="flex-1 text-center bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 rounded transition duration-300 shadow mx-2"
          >
            Daily Challenge
          </Link>

          <Link
            to="/leaderboard"
            className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded transition duration-300 shadow mx-2"
          >
            Leaderboard
          </Link>

          <Link
            to="/profile"
            className="flex-1 text-center bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded transition duration-300 shadow mx-2"
          >
            Profile
          </Link>

          <Link
            to="/"
            className="flex-1 text-center bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 rounded transition duration-300 shadow mx-2"
          >
            🏠 Home
          </Link>

          <button
            onClick={handleLogout}
            className="flex-1 text-center bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded transition duration-300 shadow mx-2"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
