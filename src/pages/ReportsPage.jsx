import React, { useState } from "react";
import { useAchievements } from "../context/AchievementContext";

export default function ReportsPage() {
  const { achievements } = useAchievements();
  const [search, setSearch] = useState("");

  // Filter by student name
  const filteredData = achievements.filter((a) =>
    a.student.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container py-16">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">
        Student Achievement Report 📊
      </h1>

      {/* 🔍 Search bar */}
      <input
        type="text"
        placeholder="Search by student name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded w-full max-w-md mb-6 shadow-sm"
      />

      {filteredData.length === 0 ? (
        <p className="text-slate-600">
          {search ? "No results found." : "No achievements recorded yet."}
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border rounded-lg bg-white shadow-md">
            <thead className="bg-blue-600 text-white text-sm">
              <tr>
                <th className="p-2 border">Student Name</th>
                <th className="p-2 border">Event</th>
                <th className="p-2 border">Category</th>
                <th className="p-2 border">Date</th>
              </tr>
            </thead>

            <tbody className="text-sm text-slate-700">
              {filteredData.map((a) => (
                <tr key={a.id} className="hover:bg-slate-100">
                  <td className="p-2 border">{a.student}</td>
                  <td className="p-2 border">{a.title}</td>
                  <td className="p-2 border">{a.category}</td>
                  <td className="p-2 border">{a.uploadDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
