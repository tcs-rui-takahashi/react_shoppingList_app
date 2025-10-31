import { useState } from "react";
import { InputForm } from "./components/InputForm/InputForm";
import { ItemList } from "./components/ItemList";
import { TotalAmount } from "./components/TotalAmount";
import type { Item } from "./types/Items";

function App() {
  const [items, setItems] = useState<Item[]>([]);

  const handleAddItem = (newItem: Item) => {
    setItems((prev) => [newItem, ...prev]);
  };

  return (
    <div className="flex flex-col min-h-screen text-gray-800">
      <header className="bg-blue-300 text-white text-center py-3 px-4 shadow">
        <h1 className="text-xl font-bold">Shopping List App</h1>
      </header>

      <main>
        <div className="flex-1 p-6">
          <InputForm onAddItem={handleAddItem} />
          <ItemList items={items} />
          <TotalAmount />
        </div>
      </main>

      <footer className="bg-gray-800 text-white text-center">
        <small className="text-[10px]">&copy; 2025 Shopping App</small>
      </footer>
    </div>
  );
}

export default App;
