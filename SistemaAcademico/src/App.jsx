import { BrowserRouter } from "react-router-dom";
import { AppProvider } from './context/AppContext';
import Header from "./components/Header";
import Footer from "./components/Footer";
import AppRouter from "./routes/AppRouter";

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Header />
        <main style={{ padding: "20px", minHeight: "70vh" }}>
          <AppRouter />
        </main>
        <Footer />
      </BrowserRouter>
    </AppProvider>
  );
}