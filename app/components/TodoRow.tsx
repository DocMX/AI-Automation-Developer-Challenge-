"use client";

import { useState } from "react";

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

interface Props {
  todo: Todo;
  onToggle: (id: string, completed: boolean) => void;
  onUpdateTitle: (id: string, title: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoRow({ todo, onToggle, onUpdateTitle, onDelete }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  const handleSave = () => {
    if (editTitle.trim() && editTitle !== todo.title) {
      onUpdateTitle(todo.id, editTitle.trim());
    }
    setIsEditing(false);
  };

  return (
    <tr className="hover:bg-gray-50 transition duration-150 ease-in-out">
      <td className="px-4 py-3 text-sm text-gray-800 break-words">
        {isEditing ? (
          <div className="flex gap-2">
            <input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="border rounded px-2 py-1 text-sm flex-1"
            />
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition"
            >
              Save
            </button>
            <button
              onClick={() => { setIsEditing(false); setEditTitle(todo.title); }}
              className="bg-gray-300 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        ) : (
          <span>{todo.title}</span>
        )}
      </td>
      <td className="px-4 py-3 text-center">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id, !todo.completed)}
          className="h-5 w-5 cursor-pointer accent-green-500"
        />
      </td>
      <td className="px-4 py-3 text-center flex justify-center gap-2 flex-wrap">
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-yellow-400 text-white px-3 py-1 rounded text-sm hover:bg-yellow-500 transition"
          >
            Edit
          </button>
        )}
        <button
          onClick={() => onDelete(todo.id)}
          className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
