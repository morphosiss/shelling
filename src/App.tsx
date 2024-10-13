import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Desafios from "./pages/Desafios";
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/desafios" element={<Desafios />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
