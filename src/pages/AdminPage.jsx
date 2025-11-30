import React, { useState } from "react";
import { useAchievements } from "../context/AchievementContext";
import { motion } from "framer-motion";
import { Award, Users, ListChecks, Moon, Sun } from "lucide-react";

export default function AdminPage() {
  const { achievements, pendingAchievements, approveAchievement, rejectAchievement } =
    useAchievements();

  const [darkMode, setDarkMode] = useState(false);

  function openFile(url) {
    fetch(url)
      .then(r => r.blob())
      .then(blob => window.open(URL.createObjectURL(blob), "_blank"));
  }

  const totalApproved = achievements.filter(a => a.status === "approved").length;
  const totalStudents = new Set([
    ...achievements.map(a => a.student),
    ...pendingAchievements.map(a => a.student),
  ]).size;
  const totalCategories = new Set(achievements.map(a => a.category)).size;

  const statCards = [
    { title: "Approved Achievements", value: totalApproved, icon: <Award />, border: "border-blue-500" },
    { title: "Total Students", value: totalStudents, icon: <Users />, border: "border-green-500" },
    { title: "Activity Categories", value: totalCategories, icon: <ListChecks />, border: "border-purple-500" },
  ];

  return (
    <div
      className={`relative min-h-screen p-6 transition duration-500 ${
        darkMode ? "text-gray-100" : "text-gray-900"
      }`}
      style={{
        backgroundImage: `url("https://images.unsplash.com/photo-1664575602554-20859cc0e1fd?auto=format&fit=crop&w=1600&q=80")`,
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
      }}
    >
      {/* BLUR OVERLAY */}
      <div
        className={`absolute inset-0 backdrop-blur-2xl ${
          darkMode ? "bg-black/55" : "bg-white/65"
        } -z-10`}
      />

      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight">Admin Dashboard 🛠️</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-3 rounded-full shadow bg-gray-200 hover:scale-110 transition"
        >
          {darkMode ? <Sun className="text-yellow-300" /> : <Moon className="text-blue-600" />}
        </button>
      </div>

      {/* STAT CARDS — ALWAYS BRIGHT */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {statCards.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className={`bg-gradient-to-br from-white to-blue-50 border-l-8 ${s.border} p-6 rounded-3xl shadow-lg flex justify-between items-center`}
          >
            <div>
              <p className="text-sm opacity-70 font-semibold">{s.title}</p>
              <h2 className="text-5xl font-extrabold mt-2">{s.value}</h2>
            </div>
            <div className="p-3 text-4xl opacity-70">{s.icon}</div>
          </motion.div>
        ))}
      </div>

      {/* PENDING */}
      <h2 className="text-3xl font-bold mb-4">Pending Requests 🔍</h2>
      {pendingAchievements.length === 0 ? (
        <p className="bg-gradient-to-br from-white to-blue-50 p-4 rounded-xl shadow-md text-center border">
          No pending requests 🚀
        </p>
      ) : (
        pendingAchievements.map((a, index) => (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-gradient-to-br from-white to-blue-50 p-6 rounded-xl shadow-lg mb-6 border-l-4 border-yellow-400"
          >
            <h3 className="text-xl font-bold text-blue-700">{a.title}</h3>
            <p className="text-sm opacity-85 mb-2">
              Student: <b>{a.student}</b> | Category: {a.category}
            </p>

            <button
              onClick={() => openFile(a.fileUrl)}
              className="text-blue-700 underline text-sm hover:opacity-90"
            >
              📎 View Document
            </button>

            <div className="flex gap-4 mt-4">
              <button
                onClick={() => approveAchievement(a.id)}
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg shadow"
              >
                Approve
              </button>
              <button
                onClick={() => {
                  const reason = prompt("Enter rejection reason:");
                  if (reason) rejectAchievement(a.id, reason);
                }}
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg shadow"
              >
                Reject
              </button>
            </div>
          </motion.div>
        ))
      )}

      {/* APPROVED */}
      <h2 className="text-3xl font-bold mt-14 mb-4 border-t pt-6">Approved Achievements ✅</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {achievements.filter(a => a.status === "approved").map(a => (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-br from-white to-blue-50 p-5 rounded-xl shadow-md border-l-4 border-green-500"
          >
            <h3 className="font-semibold text-lg mb-1">{a.title}</h3>
            <p className="text-sm opacity-75">Student: {a.student}</p>
            <button onClick={() => openFile(a.fileUrl)} className="text-blue-700 underline text-xs mt-1">
              📎 View File
            </button>
          </motion.div>
        ))}
      </div>

      {/* REJECTED */}
      <h2 className="text-3xl font-bold mt-14 mb-4 border-t pt-6">Rejected Achievements ❌</h2>
      <div className="grid md:grid-cols-2 gap-4 mb-10">
        {achievements.filter(a => a.status === "rejected").map(a => (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-br from-white to-blue-50 p-5 rounded-xl shadow-md border-l-4 border-red-500"
          >
            <h3 className="font-semibold text-lg mb-1">{a.title}</h3>
            <p className="text-sm opacity-75">Student: {a.student}</p>
            {a.rejectReason && (
              <p className="text-red-500 text-xs italic mt-1">Reason: "{a.rejectReason}"</p>
            )}
            <button onClick={() => openFile(a.fileUrl)} className="text-blue-700 underline text-xs mt-1">
              📎 View File
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
