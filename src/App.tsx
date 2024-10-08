import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Guide from "./components/Guide";
import Header from "./components/Header";
import Home from "./pages/Home";
import Desafios from "./pages/Desafios";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/desafios" element={<Desafios />} />
      </Routes>
    </>
  );
}

export default App;
