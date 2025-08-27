"use server";

import { supabaseServer } from "@/lib/supabaseServer";

export async function fetchTodos() {
  const { data, error } = await supabaseServer
    .from("todos")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return { todos: data || [] };
}

export async function addTodo(title: string) {
  if (!title.trim()) return { ok: false, error: "Title is required." };

  const { data, error } = await supabaseServer
    .from("todos")
    .insert({ title: title.trim() })
    .select() // <--- importante para obtener el objeto insertado
    .single(); // <--- para obtener un solo objeto

  return { ok: !error, error: error?.message, data };
}


export async function toggleTodo(id: string, completed: boolean) {
  const { error } = await supabaseServer
    .from("todos")
    .update({ completed })
    .eq("id", id);

  return { ok: !error, error: error?.message };
}

export async function updateTitle(id: string, title: string) {
  if (!title.trim()) return { ok: false, error: "Title is required." };

  const { error } = await supabaseServer
    .from("todos")
    .update({ title: title.trim() })
    .eq("id", id);

  return { ok: !error, error: error?.message };
}

export async function deleteTodo(id: string) {
  const { error } = await supabaseServer
    .from("todos")
    .delete()
    .eq("id", id);

  return { ok: !error, error: error?.message };
}
