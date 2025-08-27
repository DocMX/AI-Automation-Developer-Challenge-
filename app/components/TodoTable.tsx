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
    <div className="overflow-x-auto w-full border border-gray-300 rounded-lg shadow-md bg-gray-200">
      <table className="min-w-full divide-y divide-gray-300 table-auto">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 sm:px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wide">
              Task
            </th>
            <th className="px-4 sm:px-6 py-3 text-center text-sm font-semibold text-gray-700 uppercase tracking-wide">
              Completed
            </th>
            <th className="px-4 sm:px-6 py-3 text-center text-sm font-semibold text-gray-700 uppercase tracking-wide">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
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
        <div className="p-6 text-center text-gray-500 italic">
          No tasks yet. Add one above!
        </div>
      )}
    </div>
  );
}
