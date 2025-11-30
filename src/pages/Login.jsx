import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAchievements } from "../context/AchievementContext";
import Logo from "../assets/logo.png";

export default function Login() {
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const { login } = useAchievements();
  const nav = useNavigate();

  function submit(e) {
    e.preventDefault();
    const user = login(u, p);
    if (user) {
      nav(user.role === "admin" ? "/admin" : "/student");
    } else {
      alert("Invalid credentials");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50 px-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-md border border-slate-200 shadow-xl rounded-2xl p-8">

        <div className="flex justify-center mb-6">
          <Link to="/">
            <img
              src={Logo}
              alt="AchieveTrack Logo"
              className="h-14 md:h-16 hover:scale-105 transition cursor-pointer drop-shadow"
            />
          </Link>
        </div>

        <h2 className="text-2xl font-bold text-blue-700 text-center mb-6">
          Welcome Back 👋
        </h2>

        <form onSubmit={submit} className="space-y-5">
          <input
            value={u}
            onChange={(e) => setU(e.target.value)}
            placeholder="Username"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            required
          />

          <input
            type="password"
            value={p}
            onChange={(e) => setP(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            required
          />

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition-transform active:scale-95"
          >
            Sign In
          </button>
        </form>

        <p className="text-sm text-slate-600 mt-6 text-center">
          New here?{" "}
          <Link to="/register" className="text-blue-600 font-semibold hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
