"use client";

import { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa"; // íconos de bote y lápiz

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

export default function TodoRow({
  todo,
  onToggle,
  onUpdateTitle,
  onDelete,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  const handleSave = () => {
    if (editTitle.trim() && editTitle !== todo.title) {
      onUpdateTitle(todo.id, editTitle.trim());
    }
    setIsEditing(false);
  };

  return (
    <tr className="hover:bg-yellow-50 transition duration-150 ease-in-out align-top border-b border-yellow-200 bg-[repeating-linear-gradient(transparent, transparent_23px, rgba(0,0,0,0.05)_24px)]">
      <td className="px-4 py-3 text-gray-800 break-words font-serif">
        {isEditing ? (
          <div className="flex flex-col gap-2">
            <textarea
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-lg text-lg bg-yellow-50 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none font-serif shadow-inner"
              rows={4}
              placeholder="Edit your task here..."
            />
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="bg-red-600 px-4 py-2 rounded-lg text-white font-semibold hover:bg-red-700 transition shadow"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditTitle(todo.title);
                }}
                className="bg-gray-600 px-4 py-2 rounded-lg text-white hover:bg-gray-500 transition shadow"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <span
            className={`${todo.completed ? "line-through opacity-60" : ""}`}
          >
            {todo.title}
          </span>
        )}
      </td>
      <td className="px-4 py-3 text-center">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id, !todo.completed)}
          className="h-5 w-5 cursor-pointer accent-red-500"
        />
      </td>
      <td className="px-4 py-3 text-center flex justify-center gap-4 flex-wrap">
        {!isEditing && (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className={`text-yellow-700 transition text-lg ${
                todo.completed
                  ? "opacity-40 cursor-not-allowed"
                  : "hover:text-yellow-800"
              }`}
              title={
                todo.completed
                  ? "No puedes editar una tarea completada"
                  : "Edit"
              }
              disabled={todo.completed}
            >
              <FaEdit />
            </button>

            <button
              onClick={() => onDelete(todo.id)}
              className="text-red-600 hover:text-red-700 transition text-lg"
              title="Delete"
            >
              <FaTrash />
            </button>
          </>
        )}
      </td>
    </tr>
  );
}
