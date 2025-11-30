import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUserShield, FaUserGraduate, FaUserPlus } from "react-icons/fa";

export default function Home() {
  // Background image (online – no need to store locally)
  const bgImg =
    "https://img.freepik.com/premium-vector/student-graduation-online-education-e-learning-illustration_2175-6515.jpg"; // similar to the one you uploaded

  return (
    <div className="w-full bg-gray-50">
      {/* HERO SECTION */}
      <div
        className="relative w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImg})` }}
      >
        <div className="bg-blue-700/70 w-full h-full">
          <div className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12">
            {/* LEFT HEADING TEXT */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="flex flex-col justify-center"
            >
              <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-white drop-shadow">
                Track Your Achievements with
                <br />
                <span className="text-yellow-300">Pride & Confidence</span>
              </h1>

              <p className="text-gray-200 text-lg mt-6 leading-relaxed max-w-xl">
                Store, showcase & verify academic and extracurricular accomplishments on one trusted digital platform.
              </p>
            </motion.div>

            {/* RIGHT LOGIN SELECTION CARDS */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="grid gap-6"
            >
              {[
                {
                  title: "Admin Login",
                  desc: "Manage & approve student achievements",
                  icon: <FaUserShield size={38} className="text-blue-700" />,
                  link: "/login",
                  role: { role: "admin" },
                },
                {
                  title: "Student Login",
                  desc: "Submit & track your achievements",
                  icon: <FaUserGraduate size={38} className="text-blue-700" />,
                  link: "/login",
                  role: { role: "student" },
                },
                {
                  title: "Register",
                  desc: "Create your student account",
                  icon: <FaUserPlus size={38} className="text-blue-700" />,
                  link: "/register",
                  role: {},
                },
              ].map((card, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white p-6 rounded-2xl shadow-xl border border-slate-200 flex gap-4 items-center cursor-pointer hover:shadow-2xl transition"
                >
                  {card.icon}
                  <div>
                    <h3 className="font-bold text-blue-700 text-xl">{card.title}</h3>
                    <p className="text-slate-600 text-sm">{card.desc}</p>
                    <Link
                      to={card.link}
                      state={card.role}
                      className="inline-block mt-3 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-semibold"
                    >
                      Continue →
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* ABOUT SECTION */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-teal-50" id="about">
        <div className="max-w-6xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold text-blue-800 mb-6">Why AchieveTrack?</h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-14">
            A smart digital platform designed to empower students, simplify approvals for admins,
            and bring global recognition to achievements.
          </p>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                title: "Instant Tracking",
                desc: "Submit achievements in seconds with supporting proof.",
              },
              {
                title: "Smart Verification",
                desc: "Admin validation ensures credibility and authenticity.",
              },
              {
                title: "Digital Portfolio",
                desc: "Share a professional record of achievements anytime.",
              },
            ].map((feat, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-6 rounded-2xl shadow-lg text-center border"
              >
                <h3 className="font-bold text-blue-700 text-xl mb-2">{feat.title}</h3>
                <p className="text-gray-600 text-sm">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
