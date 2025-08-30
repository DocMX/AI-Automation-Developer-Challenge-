"use client";

import { useEffect, useState } from "react";
import {
  fetchTodos,
  addTodo,
  toggleTodo,
  updateTitle,
  deleteTodo,
} from "./actions";
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
    try {
      const { todos: data } = await fetchTodos();
      setTodos(data);
    } catch (err) {
      console.error("Error loading todos:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const pageCount = Math.ceil(todos.length / pageSize);
  const currentTodos = todos.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );

  const handlePrev = () => setCurrentPage((p) => Math.max(p - 1, 0));
  const handleNext = () =>
    setCurrentPage((p) => Math.min(p + 1, pageCount - 1));

  const handleAdd = async (title: string) => {
    const tempId = Date.now().toString();
    const newTodo: Todo = { id: tempId, title, completed: false };
    setTodos((prev) => [newTodo, ...prev]);
    setCurrentPage(0);

    try {
      await addTodo(title);
      await loadTodos();
    } catch {
      setTodos((prev) => prev.filter((t) => t.id !== tempId));
    }
  };

  const handleToggle = async (id: string, completed: boolean) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, completed } : todo))
    );
    try {
      await toggleTodo(id, completed);
    } catch {
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, completed: !completed } : todo
        )
      );
    }
  };

  const handleUpdateTitle = async (id: string, title: string) => {
    const oldTodo = todos.find((t) => t.id === id);
    if (!oldTodo) return;
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, title } : t)));
    try {
      await updateTitle(id, title);
    } catch {
      setTodos((prev) => prev.map((t) => (t.id === id ? oldTodo : t)));
    }
  };

  const handleDelete = async (id: string) => {
    const deletedTodo = todos.find((t) => t.id === id);
    if (!deletedTodo) return;
    setTodos((prev) => prev.filter((t) => t.id !== id));
    try {
      await deleteTodo(id);
    } catch {
      setTodos((prev) => [deletedTodo, ...prev]);
    }
  };

  if (loading)
    return <p className="p-6 text-white text-center text-lg">Loading...</p>;

  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-start py-10 px-4">
      <div className="w-full max-w-3xl bg-gray-900 rounded-xl shadow-2xl p-6 space-y-6 relative" style={{ fontFamily: "'Indie Flower', cursive" }}>
        {/* Encabezado tipo libreta */}
        <h1 className="text-4xl font-extrabold text-red-500 tracking-wider text-center mb-6 underline decoration-red-600 decoration-4">
          To-Do List
        </h1>

        {/* Formulario */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-inner">
          <NewTodoForm onAdd={handleAdd} />
        </div>

        {/* Tabla de tareas tipo hoja */}
        <div className="bg-gray-700 p-4 rounded-lg shadow-lg">
          <TodoTable
            todos={currentTodos}
            onToggle={handleToggle}
            onUpdateTitle={handleUpdateTitle}
            onDelete={handleDelete}
          />
        </div>

        {/* Paginación */}
        {todos.length > pageSize && (
          <div className="flex justify-between mt-6 items-center text-gray-300">
            <button
              onClick={handlePrev}
              disabled={currentPage === 0}
              className="bg-gray-800 px-4 py-2 rounded-lg disabled:opacity-50 hover:bg-gray-700 transition"
            >
              Previous
            </button>
            <span className="text-sm text-gray-400">
              Page {currentPage + 1} of {pageCount}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === pageCount - 1}
              className="bg-gray-800 px-4 py-2 rounded-lg disabled:opacity-50 hover:bg-gray-700 transition"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
