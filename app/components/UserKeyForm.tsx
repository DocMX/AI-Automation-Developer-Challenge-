"use client";

import { FormEvent, useState } from "react";
// at the moment this component is not used
interface Props {
  userKey: string;
  onSave: (value: string) => void;
}

export default function UserKeyForm({ userKey, onSave }: Props) {
  const [value, setValue] = useState(userKey);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value.trim()) onSave(value.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Name or identifier..."
        className="flex-1 rounded border px-3 py-2"
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
    </form>
  );
}
