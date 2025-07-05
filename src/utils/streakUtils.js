// src/streakUtils.js
import { getDoc, setDoc, doc } from "firebase/firestore";
import { db } from "./firebase";

export const updateStreakAndXP = async (userId) => {
  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);

  let userData = userSnap.data() || {
    streak: 0,
    xp: 0,
    lastCompleted: null,
    badges: [],
  };

  const today = new Date().toISOString().split("T")[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];

  let newStreak = userData.streak || 0;
  let lostStreak = false;

  if (userData.lastCompleted === today) {
    return; // already submitted today
  } else if (userData.lastCompleted === yesterday) {
    newStreak += 1;
  } else {
    newStreak = 1;
    lostStreak = true;
  }

  const newXP = (userData.xp || 0) + 10;

  // Make sure badges are updated to match current streak (1 to 7)
  const cappedStreak = Math.min(newStreak, 7); // limit to 7
  const updatedBadges = Array.from({ length: cappedStreak }, (_, i) => i + 1);

  await setDoc(userRef, {
    ...userData,
    streak: newStreak,
    xp: newXP,
    lastCompleted: today,
    badges: updatedBadges,
  });

  if (lostStreak) {
    alert("⚠️ You lost your streak. Don’t give up!");
  }
};
