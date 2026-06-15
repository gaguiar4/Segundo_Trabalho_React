import styles from './Disciplinas.module.css';

export default function Disciplinas() {
  const disciplinas = [
    {
      id: 1,
      titulo: "Programação em Python",
      descricao: "Aprenda os fundamentos de Python com foco em desenvolvimento web e análise de dados.",
      horario: "Seg/Qua - 14:00 às 16:00",
      icon: "🐍"
    },
    {
      id: 2,
      titulo: "JavaScript Avançado",
      descricao: "Domine JavaScript moderno com ES6+, async/await e manipulação do DOM.",
      horario: "Ter/Qui - 10:00 às 12:00",
      icon: "📜"
    },
    {
      id: 3,
      titulo: "React.js",
      descricao: "Crie aplicações front-end interativas com React, Hooks e gerenciamento de estado.",
      horario: "Seg/Qua - 10:00 às 12:00",
      icon: "⚛️"
    },
    {
      id: 4,
      titulo: "Banco de Dados SQL",
      descricao: "Projete e gerencie bancos de dados relacionais com SQL e otimização de queries.",
      horario: "Ter/Qui - 14:00 às 16:00",
      icon: "🗄️"
    },
    {
      id: 5,
      titulo: "Node.js & Express",
      descricao: "Desenvolva APIs REST robustas com Node.js, Express e padrões de arquitetura.",
      horario: "Sex - 13:00 às 17:00",
      icon: "🚀"
    },
    {
      id: 6,
      titulo: "Git & Controle de Versão",
      descricao: "Domine Git, GitHub e workflows colaborativos em projetos de desenvolvimento.",
      horario: "Qua - 18:00 às 19:30",
      icon: "🔀"
    }
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.titulo}>Disciplinas de Programação</h1>
      <p className={styles.descricao}>
        Grade curricular completa com cursos da área de programação e desenvolvimento de software.
      </p>
      
      <div className={styles.gridDisciplinas}>
        {disciplinas.map((disciplina) => (
          <div 
            key={disciplina.id} 
            className={styles.cardDisciplina}
          >
            <div className={styles.iconoContainer}>
              <span className={styles.icono}>{disciplina.icon}</span>
            </div>
            
            <h2 className={styles.tituloDisciplina}>{disciplina.titulo}</h2>
            
            <p className={styles.descricaoDisciplina}>
              {disciplina.descricao}
            </p>
            
            <div className={styles.rodapeDisciplina}>
              <span className={styles.horario}>
                🕐 {disciplina.horario}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}