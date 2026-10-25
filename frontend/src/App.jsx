import { useState } from "react";
import {
  useConvexAuth,
  useQuery,
  useMutation,
} from "convex/react";

import {
  useAuthActions,
} from "@convex-dev/auth/react";

import { api } from "../../convex/_generated/api";

function App() {
  const {
    isAuthenticated,
    isLoading,
  } = useConvexAuth();

  const {
    signIn,
    signOut,
  } = useAuthActions();

  const [mode, setMode] =
    useState("signIn");

  const userId = useQuery(
    api.user.currentUserId
  );

  const user = useQuery(
  api.user.currentUser
  );

  const tasks = useQuery(
    api.tasks.getTasks,
    {
      ownerId: "",
    }
  );

  const summary = useQuery(
    api.summary.getSummary,
    {
      ownerId: "",
    }
  );

  const createTask =
    useMutation(
      api.tasks.createTask
    );

  const updateTask =
    useMutation(
      api.tasks.updateTask
    );

  const deleteTask =
    useMutation(
      api.tasks.deleteTask
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

          <br />
          <br />

          <input
            name="password"
            type="password"
            placeholder="Senha"
            required
          />

          <br />
          <br />

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
    <h1>To-Do List | Convex</h1>

    <p>
      Sessão ativa ✅
    </p>

    <button
      onClick={() => signOut()}
    >
      Sair
    </button>

    <hr />

    <h2>Nova tarefa</h2>

    <form
      onSubmit={async (event) => {
        event.preventDefault();

        const form =
          event.currentTarget;

        const title =
          form.title.value.trim();

        const description =
          form.description.value.trim();

        if (!title) return;

        await createTask({
          title,
          description,
          ownerId: "",
        });

        form.reset();
      }}
    >
      <input
        name="title"
        placeholder="Título"
        required
      />

      <br />
      <br />

      <textarea
        name="description"
        placeholder="Descrição"
      />

      <br />
      <br />

      <button type="submit">
        Criar tarefa
      </button>
    </form>

    <hr />

    <h2>Resumo</h2>

    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "1rem",
        marginBottom: "2rem",
        textAlign: "center",
      }}
    >
      <div
        style={{
          minWidth: "120px",
          padding: "1rem",
          border: "1px solid #ccc",
          borderRadius: "10px",
          background: "#f8f8f8",
        }}
      >
        <strong>Total</strong>

        <p>{summary.total}</p>
      </div>

      <div
        style={{
          minWidth: "120px",
          padding: "1rem",
          border: "1px solid #ccc",
          borderRadius: "10px",
          background: "#f8f8f8",
        }}
      >
        <strong>Concluídas</strong>

        <p>{summary.completed}</p>
      </div>

      <div
        style={{
          minWidth: "120px",
          padding: "1rem",
          border: "1px solid #ccc",
          borderRadius: "10px",
          background: "#f8f8f8",
        }}
      >
        <strong>Pendentes</strong>

        <p>{summary.pending}</p>
      </div>
    </div>

    <hr />

    <h2>Tarefas</h2>
    <p>
      Quantidade encontrada:
      {" "}
      {tasks.length}
    </p>

    {tasks.length === 0 && (
      <p>
        Nenhuma tarefa encontrada.
      </p>
    )}

    {tasks.map((task) => (
      <div
        key={task._id}
        style={{
          border: "1px solid #ccc",
          borderRadius: "10px",
          padding: "1rem",
          marginBottom: "1rem",
          background:
            task.completed
              ? "#f0fff0"
              : "#fff",
        }}
      >
        <strong>
          {task.title}
        </strong>

        <p>
          {task.description}
        </p>

        <p
          style={{
            color: task.completed
              ? "green"
              : "orange",
            fontWeight: "bold",
          }}
        >
          {task.completed
            ? "✅ Concluída"
            : "⏳ Pendente"}
        </p>

        <button
          onClick={() =>
            updateTask({
              id: task._id,
              completed:
                !task.completed,
            })
          }
        >
          {task.completed
            ? "Reabrir"
            : "Concluir"}
        </button>

        {" "}

        <button
          onClick={() => {
            const confirmed =
              confirm(
                "Deseja excluir?"
              );

            if (
              !confirmed
            )
              return;

            deleteTask({
              id: task._id,
            });
          }}
        >
          Excluir
        </button>
      </div>
    ))}
  </div>
);
}

export default App;