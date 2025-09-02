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
    <div className="overflow-x-auto w-full border border-yellow-200 rounded-xl shadow-lg bg-yellow-50">
      <table className="min-w-full table-auto divide-y divide-yellow-200">
        <thead className="bg-yellow-100 border-b border-yellow-300">
          <tr>
            <th className="px-4 py-3 text-left text-red-600 uppercase tracking-wider font-serif font-bold">
              Task
            </th>
            <th className="px-4 py-3 text-center text-red-600 uppercase tracking-wider font-serif font-bold">
              Completed
            </th>
            <th className="px-4 py-3 text-center text-red-600 uppercase tracking-wider font-serif font-bold">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-yellow-200">
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
        <div className="p-6 text-center text-gray-600 italic font-serif">
          No tasks yet. Add one above!
        </div>
      )}
    </div>
  );
}

