import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Guide from "./components/Guide";
import Header from "./components/Header";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
