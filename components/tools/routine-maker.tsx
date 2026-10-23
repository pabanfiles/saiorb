"use client";
import { useState } from "react";

export default function RoutineMakerTool() {
  const [tasks, setTasks] = useState<string[]>([]);
  const [task, setTask] = useState("");

  return (
    <div className="space-y-4 max-w-md mx-auto">
      <div className="flex gap-2">
        <input value={task} onChange={(e) => setTask(e.target.value)} placeholder="Enter task..." className="flex-1 p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700" />
        <button onClick={() => { if (task) { setTasks([...tasks, task]); setTask(""); } }} className="bg-blue-600 text-white px-4 py-2 rounded">Add</button>
      </div>
      <ul className="space-y-2">
        {tasks.map((t, i) => (
          <li key={i} className="p-3 bg-gray-50 dark:bg-gray-800 rounded flex justify-between">
            <span>{t}</span>
            <button onClick={() => setTasks(tasks.filter((_, idx) => idx !== i))} className="text-red-600">✕</button>
          </li>
        ))}
      </ul>
    </div>
  );
}