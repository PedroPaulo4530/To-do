import { BrowserRouter, Routes, Route } from "react-router-dom";
import Todos from "./todos.js";
import Login from "./login.js";
import Cadastro from "./cadastro.js";

function Rotas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/todos" element={<Todos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Rotas;
