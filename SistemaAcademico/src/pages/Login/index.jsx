import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { AppContext } from '../../context/AppContext';
import styles from './Login.module.css';
import api from '../../services/api';

const schemaLogin = yup.object({
  email: yup
    .string()
    .email('Insira um e-mail válido (ex: nome@faculdade.com)')
    .required('O e-mail é obrigatório'),
  senha: yup
    .string()
    .min(6, 'A senha precisa ter pelo menos 6 caracteres')
    .required('A senha é obrigatória')
}).required();

export default function Login() {
  const { setUsuarioLogado, setNomeUsuario } = useContext(AppContext);
  const navigate = useNavigate();
  const [erroGeral, setErroGeral] = useState("");

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schemaLogin)
  });

  const efetuarLogin = async (dadosFormulario) => {
    setErroGeral("");

    try {
      const response = await api.post("/auth/login", dadosFormulario);

      if (response.status === 200) {
        const tokenRecebido = response.data.token;
        localStorage.setItem("token", tokenRecebido);

        const nomeExtraido = dadosFormulario.email
          .split("@")[0]
          .replace(/^\w/, (c) => c.toUpperCase());

        setNomeUsuario(nomeExtraido);
        localStorage.setItem("nomeUsuario", nomeExtraido);

        setUsuarioLogado(true);
        localStorage.setItem("logado", "true");
        
        alert("Login realizado com sucesso!");
        navigate("/home");
      }
    } catch (error) {
      console.error("Erro ao tentar logar:", error);
      if (error.response && error.response.status === 401) {
        setErroGeral("E-mail ou senha incorretos.");
      } else {
        setErroGeral("Não foi possível conectar ao servidor backend.");
      }
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.titulo}>Acesso ao Sistema</h2>
      <p className={styles.subtitulo}>Faça o login para acessar o sistema</p>

      <form onSubmit={handleSubmit(efetuarLogin)} className={styles.formulario}>

        <div className={styles.campoGrupo}>
          <label>E-mail:</label>
          <input
            type="text"
            placeholder="exemplo@gmail.com"
            {...register("email")}
          />
          {errors.email && <span className={styles.mensagemErro}>{errors.email.message}</span>}
        </div>

        <div className={styles.campoGrupo}>
          <label>Senha:</label>
          <input
            type="password"
            placeholder="******"
            {...register("senha")}
          />
          {errors.senha && <span className={styles.mensagemErro}>{errors.senha.message}</span>}
        </div>

        {erroGeral && <p className={styles.erroGeral}>{erroGeral}</p>}

        <button type="submit" className={styles.btnEntrar}>
          Entrar no Sistema
        </button>
      </form>
    </div>
  );
}