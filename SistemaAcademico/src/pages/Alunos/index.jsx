import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import styles from './Alunos.module.css';

export default function Alunos() {
  return (
    <div className={styles.container}>
      <h1 className={styles.titulo}>Portal dos Alunos</h1>
      <p className={styles.subtitulo}>Gerencie as informações dos estudantes e faça novos cadastros</p>

      <div style={{ display: "flex", gap: "15px", marginBottom: "20px", borderBottom: "2px solid #ccc", paddingBottom: "10px" }}>
        <Link to="/alunos/listar" style={{ fontWeight: "bold", textDecoration: "none", color: "#2c3e50" }}>📋 Listar Alunos</Link>
        <Link to="/alunos/criar" style={{ fontWeight: "bold", textDecoration: "none", color: "#2c3e50" }}>➕ Novo Aluno</Link>
      </div>

      <Outlet />
    </div>
  );
}