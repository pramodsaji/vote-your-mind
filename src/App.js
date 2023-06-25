import { Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { Vote } from "./components/Vote";
import { AdminPage } from "./components/AdminPage";
import { Header } from "./components/Header";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/vote" element={<Vote />}></Route>
        <Route path="/admin" element={<AdminPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
