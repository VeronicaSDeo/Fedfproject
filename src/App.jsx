import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate
} from "react-router-dom";
import { useAchievements } from "./context/AchievementContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AdminPage from "./pages/AdminPage";
import StudentPage from "./pages/StudentPage";
import ReportsPage from "./pages/ReportsPage";
import NotFound from "./pages/NotFound";

function Register() {
  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  const { register: registerUser } = useAchievements();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(form.username, form.password);
    alert("Registered Successfully!");
    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-96 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Create Account</h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Register
        </button>
      </form>
    </div>
  );
}

function Layout() {
  const location = useLocation();
  const showFooter = ["/", "/reports"].includes(location.pathname);

  return (
    <div className="bg-gradient-to-b from-slate-50 via-white to-slate-100 min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/student" element={<StudentPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      {showFooter && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}
