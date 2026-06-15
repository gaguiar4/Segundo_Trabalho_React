import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { AuthContext} from '../context/AuthContext';

export default function PrivateRouter({ children }) {
  const { usuarioLogado } = useContext(AppContext);
  const { user } = useContext(AuthContext);

  if (!usuarioLogado && !user) {
    return <Navigate to="/" replace />;
  }

  return children ? children : <Outlet />;
}