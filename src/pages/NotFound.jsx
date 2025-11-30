import React from "react";

export default function NotFound() {
  return (
    <div className="container py-16 text-center">
      <h3 className="text-3xl font-bold text-blue-700 mb-2">
        404 — Page not found
      </h3>
      <p className="text-slate-600 text-sm">
        The page you are looking for does not exist.
      </p>
    </div>
  );
}
