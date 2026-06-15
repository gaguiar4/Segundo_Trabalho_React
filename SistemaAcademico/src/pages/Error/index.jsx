import { Link } from "react-router-dom";
import styles from './Error.module.css';

export default function Error() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.titulo}>404</h1>
        <p className={styles.mensagem}>Ops! Página não encontrada no sistema.</p>
        <Link to="/" className={styles.link}>
          Voltar para a Página Inicial
        </Link>
      </div>
    </div>
  );
}