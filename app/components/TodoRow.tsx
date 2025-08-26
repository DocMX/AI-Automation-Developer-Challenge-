"use client";

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
  return (
    <tr className="hover:bg-gray-50 transition">
      <td className="px-6 py-4 text-sm text-gray-800">{todo.title}</td>
      <td className="px-6 py-4 text-center">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id, !todo.completed)}
          className="h-5 w-5 cursor-pointer"
        />
      </td>
      <td className="px-6 py-4 text-center flex justify-center gap-2">
        <details className="relative">
          <summary className="cursor-pointer text-blue-600 text-sm">Edit</summary>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const input = (e.currentTarget.elements.namedItem("title") as HTMLInputElement).value;
              onUpdateTitle(todo.id, input);
            }}
            className="absolute mt-2 p-2 bg-white border rounded shadow flex gap-2 z-10"
          >
            <input
              name="title"
              defaultValue={todo.title}
              className="border rounded px-2 py-1 text-sm"
            />
            <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm">Save</button>
          </form>
        </details>
        <button
          onClick={() => onDelete(todo.id)}
          className="bg-red-600 text-white px-3 py-1 rounded text-sm"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
