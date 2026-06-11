import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [tema, setTema] = useState(() => {
    return localStorage.getItem("tema") || "claro";
  });

  const [usuarioLogado, setUsuarioLogado] = useState(() => {
    return localStorage.getItem("logado") === "true";
  });

  const alternarTema = () => {
    const novoTema = tema === "claro" ? "escuro" : "claro";
    setTema(novoTema);
    localStorage.setItem("tema", novoTema);
  };

  const logout = () => {
    setUsuarioLogado(false);
    localStorage.removeItem("logado");
  };

  return (
    <AppContext.Provider value={{ tema, alternarTema, usuarioLogado, setUsuarioLogado, logout }}>
      <div className={tema === "escuro" ? "modo-escuro" : "modo-claro"}>
        {children}
      </div>
    </AppContext.Provider>
  );
}