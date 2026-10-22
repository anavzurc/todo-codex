import { ConvexHttpClient } from "convex/browser";

const client = new ConvexHttpClient(
  import.meta.env.VITE_CONVEX_URL
);

const OWNER_ID = "usuario-demo";

const createBtn = document.getElementById("createBtn");

const tasksList = document.getElementById("tasks");

async function loadTasks() {

  try {

    const tasks = await client.query(
      "tasks:getTasks",
      {
        ownerId: OWNER_ID
      }
    );

    renderTasks(tasks);

    const summary = await client.query(
      "summary:getSummary",
      {
        ownerId: OWNER_ID
      }
    );

    document.getElementById("total").textContent =
      summary.total;

    document.getElementById("completed").textContent =
      summary.completed;

    document.getElementById("pending").textContent =
      summary.pending;

  } catch (error) {

    console.error(error);

  }

}

function renderTasks(tasks) {

  tasksList.innerHTML = "";

  tasks.forEach((task) => {

    const li = document.createElement("li");

    li.className = "task";

    if (task.completed) {
      li.classList.add("completed");
    }

    li.innerHTML = `
      <div>
        <h3>${task.title}</h3>

        <p>${task.description ?? ""}</p>

        <small>
          ${task.completed
            ? "✅ Concluída"
            : "⏳ Pendente"}
        </small>
      </div>

      <div>

        <button
          class="toggleBtn"
          data-id="${task._id}"
          data-completed="${task.completed}">
          ${task.completed
            ? "Reabrir"
            : "Concluir"}
        </button>

        <button
          class="deleteBtn"
          data-id="${task._id}">
          Excluir
        </button>

      </div>
    `;

    tasksList.appendChild(li);

  });

  registerButtons();

}

function registerButtons() {

  document
    .querySelectorAll(".toggleBtn")
    .forEach((button) => {

      button.addEventListener(
        "click",
        async () => {

          const id =
            button.dataset.id;

          const current =
            button.dataset.completed === "true";

          await client.mutation(
            "tasks:updateTask",
            {
              id,
              completed: !current
            }
          );

          await loadTasks();

        }
      );

    });

  document
    .querySelectorAll(".deleteBtn")
    .forEach((button) => {

      button.addEventListener(
        "click",
        async () => {

          const confirmed =
            confirm(
              "Deseja realmente excluir?"
            );

          if (!confirmed) {
            return;
          }

          const id =
            button.dataset.id;

          await client.mutation(
            "tasks:deleteTask",
            {
              id
            }
          );

          await loadTasks();

        }
      );

    });

}

createBtn.addEventListener("click", async () => {

  const title = document
    .getElementById("title")
    .value
    .trim();

  const description = document
    .getElementById("description")
    .value
    .trim();

  if (!title) {

    alert("Informe um título.");

    return;

  }

  try {

    await client.mutation(
      "tasks:createTask",
      {
        title,
        description,
        ownerId: OWNER_ID
      }
    );

    document.getElementById("title").value = "";
    document.getElementById("description").value = "";

    await loadTasks();

  } catch (error) {

    console.error(error);

    alert("Erro ao criar tarefa.");

  }

});

loadTasks();
