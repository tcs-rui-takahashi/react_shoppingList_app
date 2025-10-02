function App() {
  return (
    <div className="flex flex-col min-h-screen text-center text-gray-800">
      {/* ヘッダー */}
      <header className="bg-blue-300 text-white py-3 px-4 shadow">
        <h1 className="text-xl font-bold">Shopping List App</h1>
      </header>

      {/* メイン */}
      <main className="flex-1 p-6">
        <p className="text-base">ここに入力フォームやリストが入る予定</p>
      </main>

      {/* フッター */}
      <footer className="bg-gray-800 text-white text-center">
        <small className="text-[10px]">&copy; 2025 Shopping App</small>
      </footer>
    </div>
  );
}

export default App;