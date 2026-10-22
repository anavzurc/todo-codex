import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

function App() {
  const tasks = useQuery(api.tasks.getTasks, {
    ownerId: "usuario-demo",
  });

  const summary = useQuery(api.summary.getSummary, {
    ownerId: "usuario-demo",
  });

  if (tasks === undefined || summary === undefined) {
    return <h2>Carregando...</h2>;
  }

  return (
    <div
      style={{
        padding: "2rem",
        fontFamily: "Arial",
      }}
    >
      <h1>To-Do React + Convex</h1>

      <h2>Resumo</h2>

      <p>Total: {summary.total}</p>
      <p>Concluídas: {summary.completed}</p>
      <p>Pendentes: {summary.pending}</p>

      <hr />

      <h2>Tarefas</h2>

      {tasks.map((task) => (
        <div
          key={task._id}
          style={{
            border: "1px solid #ccc",
            padding: "1rem",
            marginBottom: "1rem",
          }}
        >
          <strong>{task.title}</strong>

          <p>{task.description}</p>

          <small>
            {task.completed
              ? "✅ Concluída"
              : "⏳ Pendente"}
          </small>
        </div>
      ))}
    </div>
  );
}

export default App;