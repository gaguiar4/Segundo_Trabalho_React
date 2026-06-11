import React from 'react';
import api from '../../../services/api';
import styles from './CriarAluno.module.css';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schemaAluno = yup.object({
  nome: yup
    .string()
    .required('O nome é obrigatório'),  
  matricula: yup
    .string()
    .required('A matrícula é obrigatória'),
  curso: yup
    .string()
    .required('O curso é obrigatório')
}).required();

export default function CriarAluno() {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schemaAluno)
  });

  const cadastrarAluno = async (data) => {
    try {
      const response = await api.post("/alunos", data);
      if (response.status === 200 || response.status === 201) {
        alert("Aluno cadastrado com sucesso!");
        navigate("/alunos/listar");
      }
    } catch (error) {
      console.error("Erro na requisição: ", error);
      alert("Não foi possível conectar a API");
    }
  };

  return (
    <div>
      <h2>Cadastrar Novo Aluno</h2>
      <form onSubmit={handleSubmit(cadastrarAluno)} className={styles.formulario}>
        
        <input 
          type="text" 
          placeholder="Nome do Aluno" 
          {...register("nome")}
        />
        {errors.nome && <p className={styles.erroMensagem}>{errors.nome.message}</p>}

        <input 
          type="text" 
          placeholder="Matrícula" 
          {...register("matricula")} 
        />
        {errors.matricula && <p className={styles.erroMensagem}>{errors.matricula.message}</p>}

        <input 
          type="text" 
          placeholder="Curso" 
          {...register("curso")} 
        />
        {errors.curso && <p className={styles.erroMensagem}>{errors.curso.message}</p>}

        <button type="submit" className={styles.btnSalvar}>Salvar novo Aluno</button>
      </form>
    </div>
  );
}