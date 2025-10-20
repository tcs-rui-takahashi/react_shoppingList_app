import { useState } from "react";
import type { Item } from "../types/Items";

export function InputForm() {
  const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState<{
    name: string;
    quantity?: number;
    unit?: string;
    memo?: string;
  }>({
    name: "",
    quantity: undefined,
    unit: "",
    memo: "",
  });

  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "quantity") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value === "" ? undefined : Number(value),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }

    if (name === "name" && value.trim() !== "") {
    setError(null);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.name.trim() === "") {
      setError("品名を入力してください。");
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const newItem: Item = {
      id: crypto.randomUUID(),
      name: formData.name,
      quantity: formData.quantity,
      unit: formData.unit || undefined,
      completed: false,
      note: formData.memo || undefined,
    };

    //TODO: 入力データをPropsでAppに渡す

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: "",
      quantity: undefined,
      unit: "",
      memo: "",
    });
    setError(null);
    setIsOpen(false);
  };

  return (
    <section className="mb-4">
      {!isOpen && ( <button className="bg-blue-500 text-white rounded hover:bg-blue-700 px-4 py-3" onClick={() => setIsOpen(true)}>アイテムを新規追加</button> )}

      {isOpen && (
        <form onSubmit={handleSubmit} className="border p-4 rounded mt-4">
          <div className="flex mb-2">
            <label htmlFor="item" className="flex w-10 mr-2">品名 <span className="text-red-500 font-semibold">*</span> </label>
            <input
              type="text"
              id="item"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="form-input"
              placeholder="例: にんじん, 牛乳, 食パン"
            />
            {error && (<p className="text-red-500 text-sm mt-1">{error}</p>)}
          </div>

          <div className="flex mb-2">
            <label htmlFor="quantity" className=" w-10 mr-2">数量</label>
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
            <select id="unit" name="unit" value={formData.unit} onChange={handleInputChange} className="form-input">
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
              placeholder="例: 特売日、ブランド指定、代替品など"
              className="form-input w-1/2"
            ></textarea>
          </div>

          <div className="flex gap-2">
            <button type="button" onClick={() => {resetForm();}} className="btn-secondary">キャンセル</button>
            <button type="submit" className="btn-primary">追加する</button>
          </div>
        </form>
      )}
    </section>
  );
}