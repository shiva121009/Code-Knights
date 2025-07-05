import { useEffect, useState } from "react";
import { db, auth } from "../services/firebase"; // ✅ db added
import { collection, getDocs } from "firebase/firestore";

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const snapshot = await getDocs(collection(db, "users"));
        const userData = snapshot.docs.map((doc) => ({
          id: doc.id,
          username: doc.data().username || "Anonymous",
          email: doc.data().email || "",
          xp: doc.data().xp || 0,
        }));
        const sorted = userData.sort((a, b) => b.xp - a.xp);
        setUsers(sorted);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="min-h-screen pt-24 p-8 bg-gradient-to-br from-black via-zinc-900 to-cyberBlue text-white">
      <h1 className="text-4xl font-bold mb-6 text-center text-cyberPink">
        🏆 Leaderboard
      </h1>

      {loading ? (
        <div className="text-center text-lg text-gray-300">Loading...</div>
      ) : (
        <div className="max-w-2xl mx-auto bg-zinc-800 p-6 rounded-xl shadow-lg border border-zinc-700">
          {users.map((user, index) => (
            <div
              key={user.id}
              className="flex justify-between p-3 border-b border-zinc-700"
            >
              <span className="font-semibold">
                #{index + 1} {user.username}
              </span>
              <span className="text-cyberPink font-bold">{user.xp} XP</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
