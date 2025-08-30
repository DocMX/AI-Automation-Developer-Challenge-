"use client";

import TodoRow from "./TodoRow";

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

interface Props {
  todos: Todo[];
  onToggle: (id: string, completed: boolean) => void;
  onUpdateTitle: (id: string, title: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoTable({ todos, onToggle, onUpdateTitle, onDelete }: Props) {
  return (
    <div className="overflow-x-auto w-full border border-gray-700 rounded-xl shadow-lg bg-gray-800">
      <table className="min-w-full table-auto divide-y divide-gray-700">
        <thead className="bg-gray-900">
          <tr>
            <th className="px-4 py-3 text-left text-red-500 uppercase tracking-wider font-bold">Task</th>
            <th className="px-4 py-3 text-center text-red-500 uppercase tracking-wider font-bold">Completed</th>
            <th className="px-4 py-3 text-center text-red-500 uppercase tracking-wider font-bold">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {todos.map((t) => (
            <TodoRow
              key={t.id}
              todo={t}
              onToggle={onToggle}
              onUpdateTitle={onUpdateTitle}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>

      {todos.length === 0 && (
        <div className="p-6 text-center text-gray-400 italic">No tasks yet. Add one above!</div>
      )}
    </div>
  );
}
