import { useState } from "react";
import { useConvexAuth } from "convex/react";
import { useQuery } from "convex/react";
import { useAuthActions } from "@convex-dev/auth/react";

import { api } from "../../convex/_generated/api";

function App() {
  const { isAuthenticated, isLoading } =
    useConvexAuth();

  const { signIn, signOut } =
    useAuthActions();

  const [mode, setMode] =
    useState("signIn");

  const userId = useQuery(
    api.user.currentUserId
  );

  const tasks = useQuery(
  api.tasks.getTasks,
  {
    ownerId: ""
  }
);

const summary = useQuery(
  api.summary.getSummary,
  {
    ownerId: ""
  }
);

  if (isLoading) {
    return <h1>Carregando...</h1>;
  }

  if (!isAuthenticated) {
    return (
      <div style={{ padding: "2rem" }}>
        <h1>Autenticação</h1>

        <form
          onSubmit={async (event) => {
            event.preventDefault();

            const formData =
              new FormData(
                event.currentTarget
              );

            formData.set(
              "flow",
              mode
            );

            await signIn(
              "password",
              formData
            );
          }}
        >
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
          />

          <br /><br />

          <input
            name="password"
            type="password"
            placeholder="Senha"
            required
          />

          <br /><br />

          <button type="submit">
            {mode === "signIn"
              ? "Entrar"
              : "Criar Conta"}
          </button>
        </form>

        <br />

        <button
          onClick={() =>
            setMode(
              mode === "signIn"
                ? "signUp"
                : "signIn"
            )
          }
        >
          {mode === "signIn"
            ? "Criar conta"
            : "Já tenho conta"}
        </button>
      </div>
    );
  }

if (
  userId === undefined ||
  tasks === undefined ||
  summary === undefined
) {
  return <h1>Carregando...</h1>;
}

return (
  <div style={{ padding: "2rem" }}>
    <h1>To-Do React + Convex</h1>

    <p>
      Usuário:
    </p>

    <pre>{userId}</pre>

    <button
      onClick={() => signOut()}
    >
      Sair
    </button>

    <hr />

    <h2>Resumo</h2>

    <p>Total: {summary.total}</p>

    <p>
      Concluídas:
      {summary.completed}
    </p>

    <p>
      Pendentes:
      {summary.pending}
    </p>

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
        <strong>
          {task.title}
        </strong>

        <p>
          {task.description}
        </p>

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