import { useEffect, useState } from "react";
import { db, auth } from "./firebase";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";

const Dashboard = () => {
  const [xp, setXP] = useState(0);
  const [streak, setStreak] = useState(0);
  const [badgeCount, setBadgeCount] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      const uid = auth.currentUser?.uid;
      if (!uid) return;

      const userDoc = await getDoc(doc(db, "users", uid));
      if (userDoc.exists()) {
        const data = userDoc.data();
        setXP(data.xp || 0);
        setStreak(data.streak || 0);
      }

      const badgeDocs = await getDocs(collection(db, "users", uid, "challengeHistory"));
      setBadgeCount(badgeDocs.size);
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-6 font-mono">
      <h1 className="text-4xl font-bold text-cyberPink mb-6">🎯 Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-zinc-800 p-6 rounded-xl border border-zinc-700 text-center shadow">
          <h2 className="text-2xl font-semibold mb-2">🔥 Streak</h2>
          <p className="text-3xl">{streak} Days</p>
        </div>
        <div className="bg-zinc-800 p-6 rounded-xl border border-zinc-700 text-center shadow">
          <h2 className="text-2xl font-semibold mb-2">💎 XP</h2>
          <p className="text-3xl">{xp}</p>
        </div>
        <div className="bg-zinc-800 p-6 rounded-xl border border-zinc-700 text-center shadow">
          <h2 className="text-2xl font-semibold mb-2">🏅 Badges</h2>
          <p className="text-3xl">{badgeCount}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
