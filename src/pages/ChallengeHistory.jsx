import { useEffect, useState } from "react";
import { db, auth } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

const ChallengeHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const uid = auth.currentUser?.uid;
      if (!uid) return;

      const userHistoryRef = collection(db, "users", uid, "challengeHistory");
      const querySnapshot = await getDocs(userHistoryRef);
      const result = querySnapshot.docs.map((doc) => ({
        day: doc.id,
        ...doc.data(),
      }));
      setHistory(result);
    };

    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-8 font-mono">
      <h1 className="text-3xl font-bold text-cyberPink mb-6">📜 Your Completed Challenges</h1>
      {history.length === 0 ? (
        <p className="text-gray-400">No challenges completed yet.</p>
      ) : (
        <ul className="space-y-3">
          {history.map((entry, index) => (
            <li
              key={index}
              className="p-4 rounded-lg bg-zinc-800 border border-cyberBlue shadow-md"
            >
              ✅ Day {entry.day}{entry.title ? `: ${entry.title}` : ""}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChallengeHistory;
