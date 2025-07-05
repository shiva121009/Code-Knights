import React, { useEffect, useState } from "react";
import { auth, db } from "../services/firebase"; 
import { doc, getDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

// ✅ Full 30-Day Badge List with Icons
const badgeData = [
  { day: 1, name: "Knight’s Spark", icon: "🧭" },
  { day: 2, name: "Logic Blade", icon: "⚔️" },
  { day: 3, name: "Echo Knight", icon: "🔊" },
  { day: 4, name: "Truth Seeker", icon: "🔍" },
  { day: 5, name: "Order Bringer", icon: "🧱" },
  { day: 6, name: "Even Slayer", icon: "🪓" },
  { day: 7, name: "Path Breaker", icon: "🛤️" },
  { day: 8, name: "Max Guardian", icon: "🛡️" },
  { day: 9, name: "Mirror Walker", icon: "🔮" },
  { day: 10, name: "Factor Forge", icon: "🔨" },
  { day: 11, name: "Spiral Warden", icon: "🌀" },
  { day: 12, name: "Array Reaver", icon: "🧩" },
  { day: 13, name: "Twin Hunter", icon: "🎯" },
  { day: 14, name: "Vowel Whisperer", icon: "🗣️" },
  { day: 15, name: "Totem Caller", icon: "🕯️" },
  { day: 16, name: "First Light", icon: "🌅" },
  { day: 17, name: "Even Veil", icon: "🧥" },
  { day: 18, name: "Forge Caller", icon: "🔧" },
  { day: 19, name: "Chain Binder", icon: "⛓️" },
  { day: 20, name: "Word Seer", icon: "📜" },
  { day: 21, name: "Square Sentinel", icon: "📐" },
  { day: 22, name: "Prime Bane", icon: "🧿" },
  { day: 23, name: "Lexicon Crusher", icon: "📚" },
  { day: 24, name: "Balance Bringer", icon: "⚖️" },
  { day: 25, name: "Spell Breaker", icon: "✨" },
  { day: 26, name: "Time Knight", icon: "⏳" },
  { day: 27, name: "Shout Caster", icon: "📣" },
  { day: 28, name: "Cipher Blade", icon: "🗡️" },
  { day: 29, name: "Ghost Stepper", icon: "👣" },
  { day: 30, name: "Code Sovereign", icon: "👑" },
];

const Profile = () => {
  const [user] = useAuthState(auth);
  const [xp, setXP] = useState(0);
  const [streak, setStreak] = useState(0);

  const fetchUser = async () => {
    if (!user) return;
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const data = userSnap.data();
      setXP(data.xp || 0);
      setStreak(data.streak || 0);
    }
  };

  useEffect(() => {
    fetchUser();

    const onStorage = () => {
      fetchUser();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [user]);

  const earnedBadges = badgeData.slice(0, streak);

  return (
    <div className="p-6 text-white bg-gray-900 min-h-screen font-mono">
      <h1 className="text-3xl font-bold mb-4 text-pink-400">🧑‍💻 Profile</h1>

      <p className="mb-2">
        🔥 Streak: <span className="text-yellow-400 font-bold">{streak}</span>
      </p>
      <p className="mb-2">
        🏅 Badges Earned:{" "}
        <span className="text-yellow-400 font-bold">{earnedBadges.length}</span>
      </p>
      <p className="mb-4">
        ⭐ XP: <span className="text-green-400 font-bold">{xp}</span>
      </p>

      <h2 className="text-xl font-semibold mb-2 text-purple-300">🎖️ Badges</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
        {badgeData.map((badge) => {
          const earned = badge.day <= streak;
          return (
            <div
              key={badge.day}
              className={`rounded-lg p-4 shadow-lg border text-center transition-all duration-300 ${
                earned
                  ? "bg-gray-800 border-yellow-400 shadow-yellow-200"
                  : "bg-gray-800 border-gray-700 opacity-40"
              }`}
            >
              <div className="text-3xl mb-2">{badge.icon}</div>
              <div className="text-sm font-semibold">{badge.name}</div>
              <div className="mt-1 text-xs text-gray-400">Day {badge.day}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Profile;
