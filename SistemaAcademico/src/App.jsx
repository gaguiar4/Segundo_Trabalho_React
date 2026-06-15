import { useContext } from "react";
import { BrowserRouter } from "react-router-dom";
import { AppContext } from './context/AppContext';
import Header from "./components/Header";
import Footer from "./components/Footer";
import AppRouter from "./routes/AppRouter";

export default function App() {
  const { nomeUsuario } = useContext(AppContext);

  return (
    <BrowserRouter>
      <Header nomeUsuario={nomeUsuario} />
      <main style={{ 
        padding: "24px", 
        minHeight: "70vh",
        animation: "fadeIn 0.6s ease"
      }}>
        <AppRouter />
      </main>
      <Footer />
    </BrowserRouter>
  );
}