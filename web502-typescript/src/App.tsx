import { Toaster } from "react-hot-toast";
import Header from "./components/Header";
import ListPage from "./pages/ListPage";
import AddPage from "./pages/AddPage";

function App() {
  return (
    <>
      <Header logo="WEB502" />
      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto mt-10 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Chào mừng đến với WEB502</h1>
        <AddPage />
        <ListPage />
      </div>

      <Toaster />
    </>
  );
}

export default App;
