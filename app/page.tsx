import { fetchTodos, setUserKey, addTodo, toggleTodo, updateTitle, deleteTodo } from "./actions";

export default async function Page() {
  const { userKey, todos } = await fetchTodos();

  return (
    <main className="mx-auto max-w-xl p-6 space-y-6">
      <h1 className="text-2xl font-bold">Lista de Tareas</h1>

      {/* Identificador */}
      <form
        action={async (formData) => {
          "use server";
          await setUserKey(String(formData.get("userKey") || ""));
        }}
        className="flex gap-2"
      >
        <input
          name="userKey"
          defaultValue={userKey ?? ""}
          placeholder="Tu nombre o correo"
          className="flex-1 rounded border px-3 py-2"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Guardar</button>
      </form>

      {/* Nueva tarea */}
      <form
        action={async (formData) => {
          "use server";
          await addTodo(String(formData.get("title") || ""));
        }}
        className="flex gap-2"
      >
        <input name="title" placeholder="Nueva tarea..." className="flex-1 rounded border px-3 py-2" />
        <button className="bg-green-600 text-white px-4 py-2 rounded">Añadir</button>
      </form>

      {/* Lista */}
      <ul className="space-y-2">
        {todos.map((t) => (
          <li key={t.id} className="flex items-center gap-2 border rounded p-2">
            <form
              action={async () => {
                "use server";
                await toggleTodo(t.id, !t.completed);
              }}
            >
              <button
                className={`h-5 w-5 border rounded ${t.completed ? "bg-green-500" : "bg-white"}`}
              />
            </form>
            <span className={`flex-1 ${t.completed ? "line-through text-gray-500" : ""}`}>{t.title}</span>
            <details>
              <summary className="text-sm text-blue-500 cursor-pointer">Editar</summary>
              <form
                action={async (formData) => {
                  "use server";
                  await updateTitle(t.id, String(formData.get("title") || ""));
                }}
                className="flex gap-2 mt-1"
              >
                <input name="title" defaultValue={t.title} className="border rounded px-2 py-1 text-sm" />
                <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm">Guardar</button>
              </form>
            </details>
            <form
              action={async () => {
                "use server";
                await deleteTodo(t.id);
              }}
            >
              <button className="bg-red-600 text-white px-3 py-1 rounded text-sm">Borrar</button>
            </form>
          </li>
        ))}
      </ul>
    </main>
  );
}
