import { InputForm } from "./components/InputForm";
import { ItemList } from "./components/ItemList";
import { TotalAmount } from "./components/TotalAmount";

function App() {
  return (
    <div className="flex flex-col min-h-screen text-gray-800">
      <header className="bg-blue-300 text-white text-center py-3 px-4 shadow">
        <h1 className="text-xl font-bold">Shopping List App</h1>
      </header>

      <main>
        <div className="flex-1 p-6">
          <InputForm />
          <ItemList />
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
