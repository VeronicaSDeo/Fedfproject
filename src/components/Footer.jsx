import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <motion.footer
      className="bg-blue-700 text-white mt-16 py-8 px-4"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="container grid md:grid-cols-3 gap-8">

        {/* Brand details */}
        <div>
          <h2 className="text-xl font-bold">AchieveTrack</h2>
          <p className="text-slate-200 text-sm mt-2">
            Recognizing talents beyond academics. Show the world what you achieve!
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-lg">Quick Links</h3>
          <ul className="text-sm mt-2 space-y-2">
            <li><Link to="/login" className="hover:underline">Login</Link></li>
            <li><Link to="/student" className="hover:underline">Student Dashboard</Link></li>
            <li><Link to="/admin" className="hover:underline">Admin Panel</Link></li>
          </ul>
        </div>

        {/* Achievement Counter */}
        <div>
          <h3 className="font-semibold text-lg">Achievements</h3>
          <p className="mt-2 text-3xl font-bold animate-pulse">1000+ 🏆</p>
          <p className="text-xs text-slate-200">
            and counting… students making us proud!
          </p>
        </div>
      </div>

      <p className="text-center text-xs text-slate-200 mt-6">
        © {new Date().getFullYear()} AchieveTrack — All Rights Reserved
      </p>
    </motion.footer>
  );
}
