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

  const loadTodos = async () => {
    setLoading(true);
    const { todos: data } = await fetchTodos();
    setTodos(data);
    setLoading(false);
  };

  useEffect(() => {
    loadTodos();
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <main className="mx-auto max-w-3xl p-6 space-y-6">
      <h1 className="text-2xl font-bold">To Do List</h1>

      <NewTodoForm
        onAdd={async (title) => {
          await addTodo(title);
          await loadTodos();
        }}
      />

      <TodoTable
        todos={todos}
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
    </main>
  );
}
