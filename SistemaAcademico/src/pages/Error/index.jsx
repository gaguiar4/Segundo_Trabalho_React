import { Link } from "react-router-dom";

export default function Error() {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Erro 404</h1>
      <p>Ops! Página não encontrada no sistema.</p>
      <Link to="/">Voltar para a Página Inicial</Link>
    </div>
  );
}