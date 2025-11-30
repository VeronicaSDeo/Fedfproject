import React, { useState } from "react";
import { useAchievements } from "../context/AchievementContext";
import { motion } from "framer-motion";
import { Upload, CheckCircle, XCircle, Clock, Moon, Sun } from "lucide-react";

export default function StudentPage() {
  const { achievements, pendingAchievements, submitAchievementRequest, currentUser } =
    useAchievements();

  const [showUpload, setShowUpload] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [form, setForm] = useState({ title: "", category: "", description: "", file: null });

  if (!currentUser)
    return <h1 className="p-6 text-xl font-semibold text-red-600">Please log in first 🔑</h1>;

  // Collect student-specific submissions
  const uploads = [
    ...pendingAchievements.filter(a => a.student === currentUser.username),
    ...achievements.filter(a => a.student === currentUser.username),
  ];

  const approved = uploads.filter(a => a.status === "approved");
  const pending = uploads.filter(a => a.status === "pending");
  const rejected = uploads.filter(a => a.status === "rejected");

  const cardStyle =
    "bg-white border border-blue-200 shadow-sm hover:shadow-md transition rounded-xl p-6 text-gray-800";

  // SAFER file open
  function openFile(url) {
    if (!url) return alert("⚠ File not found! It may have been removed or not uploaded properly.");
    fetch(url)
      .then(r => r.blob())
      .then(blob => window.open(URL.createObjectURL(blob), "_blank"))
      .catch(() => alert("Unable to open file ❌"));
  }

  async function uploadNow(e) {
    e.preventDefault();
    if (!form.file) return alert("Upload file required!");

    const fileUrl = URL.createObjectURL(form.file);
    submitAchievementRequest({ ...form, fileUrl }, currentUser.username);

    setShowUpload(false);
    setForm({ title: "", category: "", description: "", file: null });
    alert("Submitted for review!");
  }

  const statusCards = [
    { label: "Pending", count: pending.length, icon: <Clock />, border: "border-yellow-400" },
    { label: "Approved", count: approved.length, icon: <CheckCircle />, border: "border-green-500" },
    { label: "Rejected", count: rejected.length, icon: <XCircle />, border: "border-red-500" },
  ];

  return (
    <div
      className={`relative min-h-screen p-6 transition ${
        darkMode ? "text-gray-100" : "text-gray-900"
      }`}
      style={{
        backgroundImage: `url("https://images.unsplash.com/photo-1523050854058-8df90110c9f1")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Blur overlay */}
      <div className={`${darkMode ? "bg-black/60" : "bg-white/60"} absolute inset-0 backdrop-blur-xl -z-10`} />

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">{currentUser.username}'s Dashboard 🚀</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full shadow bg-gray-200 dark:bg-gray-700 hover:scale-110 transition"
        >
          {darkMode ? <Sun className="text-yellow-400" /> : <Moon className="text-blue-600" />}
        </button>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        {statusCards.map((c, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className={`bg-white border ${c.border} border-l-4 rounded-xl p-6 shadow flex justify-between items-center`}
          >
            <div>
              <p className="text-sm font-medium">{c.label}</p>
              <h2 className="text-4xl font-extrabold">{c.count}</h2>
            </div>
            <div className="text-3xl text-gray-700">{c.icon}</div>
          </motion.div>
        ))}
      </div>

      {/* Upload button */}
      <motion.button
        onClick={() => setShowUpload(!showUpload)}
        whileHover={{ scale: 1.04 }}
        className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-blue-700 mb-8 flex items-center gap-3"
      >
        <Upload /> {showUpload ? "Hide Upload Form" : "Submit New Achievement"}
      </motion.button>

      {/* Upload Form */}
      {showUpload && (
        <motion.form
          onSubmit={uploadNow}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-blue-300 p-8 rounded-2xl shadow-xl max-w-3xl mx-auto mb-12 space-y-5"
        >
          <input
            className="w-full p-3 border rounded"
            placeholder="Achievement Title"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            required
          />
          <input
            className="w-full p-3 border rounded"
            placeholder="Category (Sports, Technical, etc.)"
            value={form.category}
            onChange={e => setForm({ ...form, category: e.target.value })}
            required
          />
          <textarea
            className="w-full p-3 border rounded h-28"
            placeholder="Description"
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            required
          />
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg"
            required
            onChange={e => setForm({ ...form, file: e.target.files[0] })}
            className="text-sm"
          />
          <button className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg text-lg shadow font-semibold">
            Submit
          </button>
        </motion.form>
      )}

      {/* Submissions */}
      <h2 className="text-2xl font-bold mb-4">My Submissions ({uploads.length})</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {uploads.map((a, i) => (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className={cardStyle}
          >
            <h3 className="font-bold text-xl text-blue-700 mb-1">{a.title}</h3>
            <p className="text-sm opacity-80 mb-2">Category: {a.category}</p>

            {/* FIXED View Document Button */}
            <button
              onClick={() => openFile(a.fileUrl)}
              disabled={!a.fileUrl}
              className={`text-blue-600 underline text-sm mt-2 ${
                !a.fileUrl ? "opacity-40 cursor-not-allowed" : "hover:text-blue-800"
              }`}
            >
              📎 View Document
            </button>

            <p className="mt-4 font-semibold text-sm">
              Status:{" "}
              {a.status === "approved" ? (
                <span className="text-green-600">Approved</span>
              ) : a.status === "rejected" ? (
                <span className="text-red-600">Rejected</span>
              ) : (
                <span className="text-yellow-600">Pending</span>
              )}
            </p>

            {a.rejectReason && (
              <p className="text-xs text-red-500 mt-2 italic">Reason: "{a.rejectReason}"</p>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
