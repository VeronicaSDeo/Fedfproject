import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAchievements } from "../context/AchievementContext";
import Logo from "../assets/logo.png"; // ⬅️ Add the logo

export default function Navbar() {
  const { currentUser, logout } = useAchievements();
  const nav = useNavigate();

  function handleLogout() {
    logout();
    nav("/");
  }

  return (
    <header className="bg-white border-b shadow-sm">
      <div className="container flex items-center justify-between py-4">

        {/* 🔹 Logo replacing text, links to Home */}
        <Link to="/" className="flex items-center">
          <img
            src={Logo}
            alt="AchieveTrack Logo"
            className="h-10 md:h-12 hover:scale-105 transition cursor-pointer"
          />
        </Link>

        <nav className="space-x-4 text-sm flex items-center">
          <Link to="/" className="hover:text-blue-700 transition">
            Home
          </Link>

          {currentUser?.role === "student" && (
            <Link
              to="/student"
              className="hover:text-blue-700 transition hidden sm:inline"
            >
              Student
            </Link>
          )}

          {currentUser?.role === "admin" && (
            <>
              <Link
                to="/admin"
                className="hover:text-blue-700 transition hidden sm:inline"
              >
                Admin
              </Link>
              <Link
                to="/reports"
                className="hover:text-blue-700 transition hidden sm:inline"
              >
                Reports
              </Link>
            </>
          )}

          {!currentUser && (
            <Link
              to="/login"
              className="ml-2 px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Login
            </Link>
          )}

          {currentUser && (
            <button
              onClick={handleLogout}
              className="ml-2 px-3 py-1 rounded bg-slate-100 hover:bg-slate-200 transition"
            >
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
