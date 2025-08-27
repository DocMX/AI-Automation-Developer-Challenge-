"use client";

import { useEffect, useState } from "react";
import { fetchTodos, addTodo, toggleTodo, updateTitle, deleteTodo } from "./actions";
import NewTodoForm from "./components/NewTodoForm";
import TodoTable from "./components/TodoTable";

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export default function TodoPage() {
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 5;

  const loadTodos = async () => {
    setLoading(true);
    const { todos: data } = await fetchTodos();
    setTodos(data);
    setLoading(false);
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const pageCount = Math.ceil(todos.length / pageSize);
  const currentTodos = todos.slice(currentPage * pageSize, (currentPage + 1) * pageSize);

  const handlePrev = () => setCurrentPage((p) => Math.max(p - 1, 0));
  const handleNext = () => setCurrentPage((p) => Math.min(p + 1, pageCount - 1));

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <main className="mx-auto max-w-3xl p-6 space-y-6">
      <h1 className="text-2xl font-bold">To Do List</h1>

      <NewTodoForm
        onAdd={async (title) => {
          await addTodo(title);
          await loadTodos();
          setCurrentPage(0); // volver a la página más reciente
        }}
      />

      <TodoTable
        todos={currentTodos}
        onToggle={async (id, completed) => {
          await toggleTodo(id, completed);
          await loadTodos();
        }}
        onUpdateTitle={async (id, title) => {
          await updateTitle(id, title);
          await loadTodos();
        }}
        onDelete={async (id) => {
          await deleteTodo(id);
          await loadTodos();
        }}
      />

      {/* Navegación de páginas */}
      {todos.length > pageSize && (
        <div className="flex justify-between mt-4">
          <button
            onClick={handlePrev}
            disabled={currentPage === 0}
            className="bg-gray-700 px-3 py-1 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm text-gray-600">
            Page {currentPage + 1} of {pageCount}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === pageCount - 1}
            className="bg-gray-700 px-3 py-1 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </main>
  );
}

