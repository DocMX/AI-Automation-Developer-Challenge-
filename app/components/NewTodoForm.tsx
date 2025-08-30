"use client";

import { FormEvent, useState } from "react";
import { addTodo } from "../actions";

interface Props {
  onAdd: (title: string) => void;
}

export default function NewTodoForm({ onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim()) return;
    setLoading(true);

    try {
      // Aquí iría tu webhook
      const enrichedTitle = title.trim(); // ejemplo
      await addTodo(enrichedTitle);
      onAdd(enrichedTitle);
      setTitle("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="flex gap-3 bg-gray-800 p-4 rounded-xl shadow-inner" onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task..."
        className="flex-1 px-3 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
        disabled={loading}
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg text-white font-semibold transition"
      >
        {loading ? "Adding..." : "Add"}
      </button>
    </form>
  );
}
