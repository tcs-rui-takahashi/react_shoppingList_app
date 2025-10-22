import { useState } from "react";
import type { Item } from "../types/Items";

const initialFormData = {
  name: "",
  quantity: undefined,
  unit: "",
  memo: "",
};

export function InputForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "quantity"
          ? value === "" ? undefined : Number(value)
          : value,
    }));

    if (name === "name" && value.trim() !== "") {
      setError(null);
    }
  };

  const validateForm = () => {
    if (formData.name.trim() === "") {
      setError("品名を入力してください。");
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const newItem: Item = {
      id: crypto.randomUUID(),
      name: formData.name.trim(),
      quantity: formData.quantity,
      unit: formData.unit || undefined,
      completed: false,
      note: formData.memo?.trim() || undefined,
    };

    // TODO: 入力データをPropsでAppに渡す

    resetForm();
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setError(null);
    setIsOpen(false);
  };

  return (
    <section className="mb-4">
      {!isOpen ? (
        <button className="bg-blue-500 text-white rounded hover:bg-blue-700 px-4 py-3" onClick={() => setIsOpen(true)}>アイテムを新規追加 </button>
      ) : (
        <form onSubmit={handleSubmit} className="border p-4 rounded mt-4">
          <div className="flex mb-2">
            <label htmlFor="name" className="flex w-10 mr-2">品名 <span className="text-red-500 font-semibold">*</span> </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="form-input"
              placeholder="例: にんじん, 牛乳, 食パン"
            />
            {error && (<p className="text-red-500 text-sm mt-1">{error}</p>)}
          </div>

          <div className="flex mb-2">
            <label htmlFor="quantity" className="w-10 mr-2">数量</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              min={0}
              value={formData.quantity ?? ""}
              onChange={handleInputChange}
              className="form-input"
              placeholder="例: 1, 2, 3..."
            />
          </div>

          <div className="flex mb-2">
            <label htmlFor="unit" className="w-10 mr-2">単位</label>
            <select
              id="unit"
              name="unit"
              value={formData.unit}
              onChange={handleInputChange}
              className="form-input"
            >
              <option value="">選択してください</option>
              <option value="個">個</option>
              <option value="本">本</option>
              <option value="袋">袋</option>
              <option value="L">L</option>
              <option value="kg">kg</option>
              <option value="g">g</option>
            </select>
          </div>

          <div className="flex mb-2">
            <label htmlFor="memo" className="w-10 mr-2">メモ</label>
            <textarea
              id="memo"
              name="memo"
              value={formData.memo}
              onChange={handleInputChange}
              className="form-input w-1/2"
              placeholder="例: 特売日、ブランド指定、代替品など"
            />
          </div>

          <div className="flex gap-2">
            <button type="button" onClick={resetForm} className="btn-secondary">キャンセル</button>
            <button type="submit" className="btn-primary">追加する</button>
          </div>
        </form>
      )}
    </section>
  );
}