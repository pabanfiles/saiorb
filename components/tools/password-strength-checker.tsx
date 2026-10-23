"use client";
import { useState } from "react";

export default function PasswordStrengthCheckerTool() {
  const [password, setPassword] = useState("");

  const getStrength = () => {
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };

  const strength = getStrength();
  const labels = ["Very Weak", "Weak", "Fair", "Good", "Strong", "Very Strong"];
  const colors = ["bg-red-500", "bg-red-400", "bg-yellow-500", "bg-yellow-400", "bg-green-500", "bg-green-600"];

  return (
    <div className="space-y-4 max-w-md mx-auto">
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
        placeholder="Enter password..."
      />
      {password && (
        <>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div className={`h-2 rounded-full transition-all ${colors[strength]}`} style={{ width: `${(strength + 1) * 16.66}%` }} />
          </div>
          <p className="text-center font-semibold">{labels[strength]}</p>
        </>
      )}
    </div>
  );
}