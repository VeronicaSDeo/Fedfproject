import React, { useState } from "react";

export default function AchievementForm({ initial = {}, onCancel, onSave }) {
  const [form, setForm] = useState({
    studentName: "",
    studentId: "",
    event: "",
    category: "",
    award: "",
    date: "",
    description: "",
    ...initial,
  });

  function update(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function submit(e) {
    e.preventDefault();
    onSave(form);
  }

  return (
    <form onSubmit={submit} className="space-y-3 text-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input
          name="studentName"
          value={form.studentName}
          onChange={update}
          placeholder="Student name"
          className="input"
          required
        />
        <input
          name="event"
          value={form.event}
          onChange={update}
          placeholder="Event name"
          className="input"
          required
        />
        <input
          name="category"
          value={form.category}
          onChange={update}
          placeholder="Category (Technical, Cultural, Sports...)"
          className="input"
        />
        <input
          name="award"
          value={form.award}
          onChange={update}
          placeholder="Award / Position"
          className="input"
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={update}
          className="input"
        />
      </div>

      <textarea
        name="description"
        value={form.description}
        onChange={update}
        placeholder="Description"
        className="input h-24"
      />

      <div className="flex gap-2 justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-1.5 bg-slate-100 rounded hover:bg-slate-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </form>
  );
}
