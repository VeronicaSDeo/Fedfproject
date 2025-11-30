import React, { createContext, useContext, useEffect, useState } from "react";

export const AchievementContext = createContext();
export function useAchievements() {
  return useContext(AchievementContext);
}

export function AchievementProvider({ children }) {
  const adminUser = { username: "admin", password: "123456", role: "admin" };

  const [achievements, setAchievements] = useState(() =>
    JSON.parse(localStorage.getItem("achievements") || "[]")
  );
  const [pendingAchievements, setPendingAchievements] = useState(() =>
    JSON.parse(localStorage.getItem("pendingAchievements") || "[]")
  );
  const [users, setUsers] = useState(() =>
    JSON.parse(localStorage.getItem("users") || JSON.stringify([adminUser]))
  );
  const [currentUser, setCurrentUser] = useState(() =>
    JSON.parse(localStorage.getItem("currentUser") || "null")
  );

  useEffect(() => localStorage.setItem("achievements", JSON.stringify(achievements)), [achievements]);
  useEffect(() => localStorage.setItem("pendingAchievements", JSON.stringify(pendingAchievements)), [pendingAchievements]);
  useEffect(() => localStorage.setItem("users", JSON.stringify(users)), [users]);
  useEffect(() => localStorage.setItem("currentUser", JSON.stringify(currentUser)), [currentUser]);

  // Student uploads achievement
  function submitAchievementRequest(item, student) {
    setPendingAchievements(prev => [
      ...prev,
      {
        ...item,
        id: "p" + Date.now(),
        student,
        status: "pending",
      }
    ]);
  }

  // Approve achievement
  function approveAchievement(id) {
    const req = pendingAchievements.find(x => x.id === id);
    if (!req) return;

    setAchievements(prev => [
      ...prev,
      {
        ...req,
        status: "approved",
        approvedDate: new Date().toLocaleString(),
        fileUrl: req.fileUrl   // ensure file is preserved
      }
    ]);

    setPendingAchievements(prev => prev.filter(x => x.id !== id));
  }

  // Reject achievement + store reason + KEEP FILE URL
  function rejectAchievement(id, reason) {
    const req = pendingAchievements.find(x => x.id === id);
    if (!req) return;

    setAchievements(prev => [
      ...prev,
      {
        ...req,
        status: "rejected",
        rejectReason: reason,
        fileUrl: req.fileUrl   // 🔥 THIS LINE FIXES THE PROBLEM
      }
    ]);

    setPendingAchievements(prev => prev.filter(x => x.id !== id));
  }

  // Auth
  function login(username, password) {
    if (username === "admin" && password === "123456") {
      setCurrentUser(adminUser);
      return adminUser;
    }
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      setCurrentUser(user);
      return user;
    }
    return null;
  }

  function register(username, password) {
    const newUser = { username, password, role: "student" };
    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
  }

  function logout() {
    setCurrentUser(null);
  }

  return (
    <AchievementContext.Provider value={{
      achievements,
      pendingAchievements,
      submitAchievementRequest,
      approveAchievement,
      rejectAchievement,
      login,
      register,
      logout,
      currentUser
    }}>
      {children}
    </AchievementContext.Provider>
  );
}
