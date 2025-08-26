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
    <div className="overflow-x-auto border rounded-lg shadow-lg">
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
              Task
            </th>
            <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">
              Completed
            </th>
            <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
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
    </div>
  );
}
