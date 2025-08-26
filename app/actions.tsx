"use server";

import { cookies } from "next/headers";
import { supabaseServer } from "@/lib/supabaseServer";


const COOKIE_NAME = "todo_user";

async function getUserKey() {
  return (await cookies()).get(COOKIE_NAME)?.value ?? null;
}

export async function setUserKey(name: string) {
  const val = name.trim();
  if (!val) return { ok: false, error: "Debes ingresar un nombre o correo." };

  (await cookies()).set(COOKIE_NAME, val, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: true,
    maxAge: 60 * 60 * 24 * 365, // 1 año
  });
  return { ok: true };
}

export async function fetchTodos() {
  const userKey = await getUserKey();
  if (!userKey) return { userKey: null, todos: [] };

  const { data, error } = await supabaseServer
    .from("todos")
    .select("*")
    .eq("user_key", userKey)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return { userKey, todos: data || [] };
}

export async function addTodo(title: string) {
  const userKey = await getUserKey();
  if (!userKey) return { ok: false, error: "Define tu identificador primero." };

  const { error } = await supabaseServer.from("todos").insert({
    title: title.trim(),
    user_key: userKey,
  });

  return { ok: !error, error: error?.message };
}

export async function toggleTodo(id: string, completed: boolean) {
  const userKey = await getUserKey();
  const { error } = await supabaseServer
    .from("todos")
    .update({ completed })
    .eq("id", id)
    .eq("user_key", userKey);

  return { ok: !error, error: error?.message };
}

export async function updateTitle(id: string, title: string) {
  const userKey = await getUserKey();
  const { error } = await supabaseServer
    .from("todos")
    .update({ title: title.trim() })
    .eq("id", id)
    .eq("user_key", userKey);

  return { ok: !error, error: error?.message };
}

export async function deleteTodo(id: string) {
  const userKey = await getUserKey();
  const { error } = await supabaseServer
    .from("todos")
    .delete()
    .eq("id", id)
    .eq("user_key", userKey);

  return { ok: !error, error: error?.message };
}
