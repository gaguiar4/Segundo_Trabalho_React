
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import styles from "./Header.module.css";

export default function Header({ nomeUsuario }) {
  const { usuarioLogado, logout, tema, alternarTema } = useContext(AppContext);
  const navigate = useNavigate();

  const fazerLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className={styles.headerContainer}>
      <h2>Sistema Acadêmico</h2>

      <button
        onClick={alternarTema}
        className={styles.btn}
        style={{
          background: tema === "claro" ? "#fafafa" : "#34495e",
          color: tema === "claro" ? "black" : "white",
        }}
      >
        {tema === "claro" ? "Modo Claro" : "Modo Escuro"}
      </button>

      {usuarioLogado ? (
        <nav className={styles.navMenu}>
          {nomeUsuario && (
            <Link to="/home" className={styles.navLink}>
              <span className={styles.nomeUsuario}>
                Olá, {nomeUsuario}!
              </span>
            </Link>
          )}

          <Link to="/home" className={styles.navLink}>Início</Link>

          <div className={styles.dropdown}>
            <Link to="/alunos" className={styles.dropdownBtn}>
              Alunos ▾
            </Link>
            <div className={styles.dropdownConteudo}>
              <Link to="/alunos/listar">Listar Alunos</Link>
              <Link to="/alunos/criar">Novo Aluno</Link>
            </div>
          </div>

          <Link to="/disciplinas" className={styles.navLink}>Disciplinas</Link>

          <button
            onClick={fazerLogout}
            className={`${styles.btn} ${styles.btnLogout}`}
          >
            Logout
          </button>
        </nav>
      ) : (
        <span className={styles.statusDeslogado}></span>
      )}
    </header>
  );
}