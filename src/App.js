import { Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { Vote } from "./components/Vote";
import { AdminPage } from "./components/AdminPage";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/vote" element={<Vote />}></Route>
        <Route path="/admin" element={<AdminPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
