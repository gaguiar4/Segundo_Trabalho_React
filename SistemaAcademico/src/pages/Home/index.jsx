import styles from './Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.titulo}>Bem-vindo ao Portal Acadêmico</h1>
      <p className={styles.descricao}>Selecione uma opção no menu acima para navegar entre as seções do sistema.</p>
      
      <div className={styles.gridCards}>
        <div className={styles.card}>
          <h2 className={styles.cardTitulo}>👥 Alunos</h2>
          <p>Gerencie a lista de alunos, crie novos registros e edite informações existentes.</p>
        </div>
        
        <div className={styles.card}>
          <h2 className={styles.cardTitulo}>📚 Disciplinas</h2>
          <p>Visualize a grade curricular e informações sobre as disciplinas ofertadas.</p>
        </div>
      </div>
    </div>
  );
}