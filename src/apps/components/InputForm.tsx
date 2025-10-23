import { useState } from "react";
import type { Item as ItemType } from "../types/Items";

type InputFormProps = {
  onAddItem: (item: ItemType) => void;
};

export function InputForm({ onAddItem }: InputFormProps) {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newItem: ItemType = {
      id: crypto.randomUUID(),
      name,
      completed: false,
    };
    onAddItem(newItem);

    setName("");
  };

  return (
    <section className="border p-4 rounded mb-4">
      <h2 className="font-bold text-lg mb-2">Add Items Here</h2>
      <form onSubmit={handleSubmit}>
        {/* TODO: 入力要素は最小限。1－1と本UIを差し替え予定 */}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="アイテム名"
          required
        />
        <button type="submit">追加</button>
      </form>
    </section>
  );
}
