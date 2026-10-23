"use client";
import { useState } from "react";

export default function QuizMakerTool() {
  const [question, setQuestion] = useState("");
  const [quizzes, setQuizzes] = useState<string[]>([]);

  return (
    <div className="space-y-4 max-w-md mx-auto">
      <textarea value={question} onChange={(e)=>setQuestion(e.target.value)} rows={3} placeholder="Enter question..." className="w-full p-2 border rounded" />
      <button onClick={() => { if (question) { setQuizzes([...quizzes, question]); setQuestion(""); } }} className="w-full bg-blue-600 text-white py-2 rounded">Add Question</button>
      <ol className="list-decimal list-inside space-y-1">
        {quizzes.map((q, i) => <li key={i} className="p-2 bg-gray-50 dark:bg-gray-800 rounded">{q}</li>)}
      </ol>
    </div>
  );
}