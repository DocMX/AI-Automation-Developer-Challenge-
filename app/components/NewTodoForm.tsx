"use client";

import { FormEvent, useState } from "react";

interface Props {
  onAdd: (title: string) => void;
}

export default function NewTodoForm({ onAdd }: Props) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title.trim());
      setTitle("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New task..."
        className="flex-1 rounded border px-3 py-2"
      />
      <button className="bg-green-600 text-white px-4 py-2 rounded">Add</button>
    </form>
  );
}
