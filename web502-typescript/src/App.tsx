import { Toaster } from "react-hot-toast";
import Header from "./components/Header";
import ListPage from "./pages/ListPage";
import AddPage from "./pages/AddPage";
import { Route, Routes } from "react-router-dom";
import EditPage from "./pages/EditPage";

function App() {
  return (
    <>
      <Header logo="WEB502" />
      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto mt-10 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Chào mừng đến với WEB502</h1>
        <Routes>
          <Route path="/" element={<ListPage />}></Route>
          <Route path="/add" element={<AddPage />}></Route>
          <Route path="/edit/:id" element={<EditPage />}></Route>
        </Routes>
      </div>

      <Toaster />
    </>
  );
}

export default App;
