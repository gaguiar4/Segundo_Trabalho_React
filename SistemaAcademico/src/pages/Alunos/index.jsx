import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import styles from './Alunos.module.css';

export default function Alunos() {
  const location = useLocation();
  
  const isListarActive = location.pathname.includes('/listar');
  const isCriarActive = location.pathname.includes('/criar');
  const isEditarActive = location.pathname.includes('/editar');

  return (
    <div className={styles.container}>
      <h1 className={styles.titulo}>Portal dos Alunos</h1>
      <p className={styles.subtitulo}>Gerencie as informações dos estudantes e faça novos cadastros</p>

      <div className={styles.tabsContainer}>
        <Link 
          to="/alunos/listar" 
          className={`${styles.tabLink} ${isListarActive ? styles.tabLinkActive : ''}`}
        >
          📋 Listar Alunos
        </Link>
        <Link 
          to="/alunos/criar" 
          className={`${styles.tabLink} ${isCriarActive ? styles.tabLinkActive : ''}`}
        >
          ➕ Novo Aluno
        </Link>
      </div>

      <div className={styles.contentWrapper}>
        <Outlet />
      </div>
    </div>
  );
}