import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../../services/api';
import styles from './EditarAluno.module.css'; 

export default function EditarAluno() {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [matricula, setMatricula] = useState("");
  const [curso, setCurso] = useState("");

  useEffect(() => {
    const carregarDadosAluno = async () => {
      try {
        const response = await api.get(`/alunos/${id}`);
        setNome(response.data.nome);
        setMatricula(response.data.matricula);
        setCurso(response.data.curso);
      } catch (error) {
        console.error("Erro ao carregar dados do aluno:", error);
        alert("Não foi possível carregar os dados do aluno.");
        navigate("/alunos/listar");
      }
    };

    carregarDadosAluno();
  }, [id, navigate]);

  const atualizarAluno = async (e) => {
    e.preventDefault();
    const alunoAtualizado = { nome, matricula, curso };

    try {
      const response = await api.put(`/alunos/${id}`, alunoAtualizado);
      
      if (response.status === 200 || response.status === 204) {
        alert("Aluno atualizado com sucesso!");
        navigate("/alunos/listar"); 
      }
    } catch (error) {
      console.error("Erro na requisição", error);
      alert("Não foi possível atualizar o aluno na API.");
    }
  };

  return (
    <div>
      <h2>Editar Informações do Aluno</h2>
      
      <form onSubmit={atualizarAluno} className={styles.formulario}>
        <input 
          type="text" 
          placeholder="Nome do Aluno" 
          value={nome} 
          onChange={(e) => setNome(e.target.value)} 
          required 
        />
        <input 
          type="text" 
          placeholder="Matrícula" 
          value={matricula} 
          onChange={(e) => setMatricula(e.target.value)} 
          required 
        />
        <input 
          type="text" 
          placeholder="Curso" 
          value={curso} 
          onChange={(e) => setCurso(e.target.value)} 
          required 
        />

        <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
          <button type="submit" className={styles.btnSalvar}>
            Salvar
          </button>
          
          <button 
            type="button" 
            onClick={() => navigate("/alunos/listar")} 
            className={styles.btnCancelar}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}