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
      const res = await fetch(
        "https://jorgevega.app.n8n.cloud/webhook-test/webhook",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: title.trim(),
            userNumber: "+524921739311", // my telephone number with country code
          }),
        }
      );

      if (!res.ok) {
        throw new Error(`Webhook failed with status ${res.status}`);
      }

      const data = await res.json();

      if (!data?.title) {
        throw new Error("No enriched title returned from webhook");
      }

      const enrichedTitle = data.title;

      // Solo aquí agregamos la tarea
      await addTodo(enrichedTitle);
      onAdd(enrichedTitle);

      setTitle("");
    } catch (err) {
      console.error("Error adding task:", err);
      alert("No se pudo agregar la tarea, intente de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New task..."
        className="flex-1 rounded border px-3 py-2"
        disabled={loading}
      />
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Adding..." : "Add"}
      </button>
    </form>
  );
}
