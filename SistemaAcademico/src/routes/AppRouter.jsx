import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Alunos from "../pages/Alunos";
import ListarAlunos from '../pages/Alunos/Listar/ListarAlunos';
import CriarAluno from '../pages/Alunos/Criar/CriarAluno';
import EditarAluno from '../pages/Alunos/Editar/EditarAluno';
import Disciplinas from "../pages/Disciplinas";

import Error from "../pages/Error";
import PrivateRouter from "./PrivateRouter";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route element={<PrivateRouter />}>
        <Route path="/home" element={<Home />} />
        
        <Route path="/alunos" element={<Alunos />}>
          <Route path="listar" element={<ListarAlunos />} />
          <Route path="criar" element={<CriarAluno />} />
          <Route path="editar/:id" element={<EditarAluno />} />
        </Route>

        <Route path="/disciplinas" element={<Disciplinas />} />
      </Route>

      <Route path="*" element={<Error />} />
    </Routes>
  );
}