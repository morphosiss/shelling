import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Desafios from "./pages/Desafios";
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import Rank from "./pages/Rank"
import ViewProfile from "./pages/ViewProfile";

function App() {
  return (
    <>
      <Routes>
        <Route path="/:jsonData?" element={<Home />} />
        <Route path="/desafios" element={<Desafios />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/rank" element={<Rank />} />
        <Route path="/profile/:idVisitant" element={<ViewProfile />} />
      </Routes>
    </>
  );
}

export default App;
