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

  // Optimistic UI Handlers

  const handleAdd = async (title: string) => {
    const tempId = Date.now().toString(); // id temporary
    const newTodo: Todo = { id: tempId, title, completed: false };

    // Añadir localmente
    setTodos((prev) => [newTodo, ...prev]);
    setCurrentPage(0);

    try {
      await addTodo(title);
      await loadTodos(); // reload
    } catch (err) {
      console.error("Error adding todo:", err);
      // Revert if fails
      setTodos((prev) => prev.filter((t) => t.id !== tempId));
    }
  };

  const handleToggle = async (id: string, completed: boolean) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, completed } : todo))
    );

    try {
      await toggleTodo(id, completed);
    } catch (err) {
      console.error("Error toggling todo:", err);
      // Revert if fails
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

    // Update immediately
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, title } : t)));

    try {
      await updateTitle(id, title);
    } catch (err) {
      console.error("Error updating title:", err);
      setTodos((prev) => prev.map((t) => (t.id === id ? oldTodo : t)));
    }
  };

  const handleDelete = async (id: string) => {
    const deletedTodo = todos.find((t) => t.id === id);
    if (!deletedTodo) return;

    setTodos((prev) => prev.filter((t) => t.id !== id));

    try {
      await deleteTodo(id);
    } catch (err) {
      console.error("Error deleting todo:", err);
      setTodos((prev) => [deletedTodo, ...prev]);
    }
  };

  // Render
  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <main className="mx-auto max-w-3xl p-6 space-y-6">
      <h1 className="text-2xl font-bold">To Do List</h1>

      <NewTodoForm onAdd={handleAdd} />

      <TodoTable
        todos={currentTodos}
        onToggle={handleToggle}
        onUpdateTitle={handleUpdateTitle}
        onDelete={handleDelete}
      />

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
