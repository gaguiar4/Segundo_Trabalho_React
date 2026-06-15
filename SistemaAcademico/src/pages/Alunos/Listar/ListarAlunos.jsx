import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../services/api';
import styles from './ListarAlunos.module.css';

export default function ListarAlunos() {
  const [listaAlunos, setListaAlunos] = useState([]);
  const [busca, setBusca] = useState("");
  const navigate = useNavigate();

  const buscarAlunos = async () => {
    try {
      const response = await api.get("/alunos");
      setListaAlunos(response.data);
    } catch (error) {
      console.error("Erro na requisição GET: ", error);
    }
  };

  const deletarAluno = async (id, nome) => {
    try {
      const response = await api.delete(`/alunos/${id}`);

      if (response.status === 204 || response.status === 200) {
        alert("Aluno removido com sucesso!");
        setListaAlunos(listaAlunos.filter(aluno => aluno.id !== id));
      }
    } catch (error) {
      console.error("Erro ao deletar aluno: ", error);
      alert("Não foi possível excluir o aluno.");
    }
  };

  useEffect(() => { buscarAlunos(); }, []);

  const alunosFiltrados = listaAlunos.filter((aluno) => {
    const termo = busca.toLowerCase();
    return (
      aluno.nome?.toLowerCase().includes(termo) ||
      aluno.matricula?.toString().toLowerCase().includes(termo)
    );
  });

  return (
    <div className={styles.alunosWrapper}>
      <h2 className={styles.alunosTitle}>Lista de Alunos Cadastrados</h2>

      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Filtrar por nome ou matrícula"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      {listaAlunos.length === 0 ? (
        <p className={styles.mensagemVazia}>Nenhum aluno cadastrado até o momento.</p>
      ) : alunosFiltrados.length === 0 ? (
        <p className={styles.mensagemVazia}>Nenhum aluno ou matrícula corresponde à busca.</p>
      ) : (
        <div className={styles.tabelaContainer}>
          <table className={styles.tabela}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Matrícula</th>
                <th>Curso</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>

              {alunosFiltrados.map((aluno) => (
                <tr key={aluno.id}>
                  <td>{aluno.id}</td>
                  <td>{aluno.nome}</td>
                  <td>{aluno.matricula}</td>
                  <td>{aluno.curso}</td>
                  <td>
                    <div className={styles.acoesContainer}>
                      <button
                        onClick={() => navigate(`/alunos/editar/${aluno.id}`)}
                        className={`${styles.btnTabela} ${styles.btnEditar}`}
                      >Editar
                      </button>

                      <button
                        onClick={() => deletarAluno(aluno.id)}
                        className={`${styles.btnTabela} ${styles.btnExcluir}`}
                      >Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}