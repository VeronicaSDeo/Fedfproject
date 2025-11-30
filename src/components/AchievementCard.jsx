import React from "react";
import { motion } from "framer-motion";

export default function AchievementCard({ a, onEdit, onDelete }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="p-4 bg-white rounded-xl shadow-sm border border-slate-200"
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-base font-semibold text-slate-900">{a.event}</h3>
          <p className="text-xs text-slate-500">
            {a.studentName} • {a.category} • {a.date}
          </p>
        </div>
        <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-1 rounded-full">
          {a.award}
        </span>
      </div>
      <p className="mt-3 text-sm text-slate-600">{a.description}</p>
      {(onEdit || onDelete) && (
        <div className="mt-4 flex gap-2">
          {onEdit && (
            <button
              onClick={() => onEdit(a)}
              className="px-3 py-1 text-xs border rounded bg-slate-50 hover:bg-slate-100"
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(a.id)}
              className="px-3 py-1 text-xs border border-red-300 text-red-600 rounded bg-red-50 hover:bg-red-100"
            >
              Delete
            </button>
          )}
        </div>
      )}
    </motion.div>
  );
}
