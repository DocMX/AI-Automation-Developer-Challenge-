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

  const handleAdd = (title: string) => {
    setTodos((prev) => [
      { id: Date.now().toString(), title, completed: false },
      ...prev,
    ]);
    setCurrentPage(0);
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
    <main className="min-h-screen bg-[#fdf6e3] flex flex-col items-center justify-start py-10 px-4">
      <div
        className="w-full max-w-3xl bg-[#fffaf0] rounded-lg shadow-xl p-8 relative border-[1.5px] border-[#d6cbb3]"
        style={{
          fontFamily: "'Indie Flower', cursive",
          backgroundImage: `repeating-linear-gradient(
          to bottom,
          transparent,
          transparent 30px,
          rgba(0,0,0,0.08) 31px
        )`,
        }}
      >

        <div className="absolute left-12 top-0 bottom-0 w-[2px] bg-red-400 opacity-70"></div>

        <h1 className="text-4xl font-extrabold text-red-600 tracking-wider text-center mb-8 underline decoration-red-400 decoration-4">
          To-Do List
        </h1>

        <div className="bg-[#fffdf5]/80 p-4 rounded-md shadow-inner border border-[#e6dcc8]">
          <NewTodoForm onAdd={handleAdd} />
        </div>

        <div className="bg-[#fffdf5]/90 p-4 rounded-md shadow-lg mt-6 border border-[#e6dcc8]">
          <TodoTable
            todos={currentTodos}
            onToggle={handleToggle}
            onUpdateTitle={handleUpdateTitle}
            onDelete={handleDelete}
          />
        </div>

        {todos.length > pageSize && (
          <div className="flex justify-between mt-6 items-center text-gray-700 font-bold">
            <button
              onClick={handlePrev}
              disabled={currentPage === 0}
              className="bg-[#f3e7d3] px-4 py-2 rounded-md disabled:opacity-50 hover:bg-[#e8dac4] transition border border-[#d6cbb3]"
            >
              Previous
            </button>
            <span className="text-sm text-gray-600">
              Page {currentPage + 1} of {pageCount}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === pageCount - 1}
              className="bg-[#f3e7d3] px-4 py-2 rounded-md disabled:opacity-50 hover:bg-[#e8dac4] transition border border-[#d6cbb3]"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
