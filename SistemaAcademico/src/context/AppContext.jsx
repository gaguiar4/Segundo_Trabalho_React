import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [tema, setTema] = useState(() => {
    return localStorage.getItem("tema") || "claro";
  });

  const [usuarioLogado, setUsuarioLogado] = useState(() => {
    return localStorage.getItem("logado") === "true";
  });

  const [nomeUsuario, setNomeUsuario] = useState(() => {
    return localStorage.getItem("nomeUsuario") || "";
  });

  const alternarTema = () => {
    const novoTema = tema === "claro" ? "escuro" : "claro";
    setTema(novoTema);
    localStorage.setItem("tema", novoTema);
  };

  const logout = () => {
    setUsuarioLogado(false);
    setNomeUsuario("");
    localStorage.removeItem("logado");
    localStorage.removeItem("nomeUsuario");
  };
  
  return (

    <AppContext.Provider
      value={{
        tema,
        alternarTema,
        usuarioLogado,
        setUsuarioLogado,
        logout,
        nomeUsuario,
        setNomeUsuario,
      }}
    >
      <div className={tema === "escuro" ? "modo-escuro" : "modo-claro"}>
        {children}
      </div>
    </AppContext.Provider>
  );
}