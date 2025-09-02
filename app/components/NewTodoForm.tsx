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
      const result = await addTodo(title.trim());
      if (result.ok && result.title) {
        onAdd(result.title);
      }
      setTitle("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="flex gap-3 bg-yellow-50 p-4 rounded-xl shadow-inner border border-yellow-200"
      onSubmit={handleSubmit}
    >
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task..."
        className="w-full p-2 border-b-2 border-yellow-300 bg-transparent text-gray-800 placeholder-gray-500 font-serif focus:outline-none focus:border-red-500 shadow-inner"
        disabled={loading}
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg text-white font-semibold transition shadow"
      >
        {loading ? "Adding..." : "Add"}
      </button>
    </form>
  );
}
