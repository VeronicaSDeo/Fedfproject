import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AchievementProvider } from "./context/AchievementContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AchievementProvider>
      <App />
    </AchievementProvider>
  </React.StrictMode>
);