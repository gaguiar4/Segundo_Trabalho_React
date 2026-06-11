import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

export default function PrivateRouter({ children }) {
  const { usuarioLogado } = useContext(AppContext);

  if (!usuarioLogado) {
    return <Navigate to="/" replace />;
  }

  return children ? children : <Outlet />;
}