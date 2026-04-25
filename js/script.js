let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;

    const span = document.createElement("span");
    span.textContent = task.text;
    if (task.done) span.classList.add("completed");

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");

    checkbox.addEventListener("change", () => {
      tasks[index].done = checkbox.checked;
      saveTasks();
      renderTasks();
    });

    editBtn.addEventListener("click", () => {
      const newText = prompt("Edit task:", task.text);
      if (newText) {
        tasks[index].text = newText;
        saveTasks();
        renderTasks();
      }
    });

    deleteBtn.addEventListener("click", () => {
      li.classList.add("fade-out");
      setTimeout(() => {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
      }, 300);
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    list.appendChild(li);
  });
}

addTask = function () {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();

  if (text === "") return;

  if (tasks.some(t => t.text.toLowerCase() === text.toLowerCase())) {
    alert("Task already exists!");
    return;
  }

  tasks.push({ text: text, done: false });
  saveTasks();
  renderTasks();

  input.value = "";
};

renderTasks();


let links = JSON.parse(localStorage.getItem("links")) || [];

function saveLinks() {
  localStorage.setItem("links", JSON.stringify(links));
}

function renderLinks() {
  const container = document.getElementById("linkList");
  container.innerHTML = "";

  links.forEach(link => {
    const a = document.createElement("a");
    a.href = link.url;
    a.textContent = link.name;
    a.target = "_blank";
    container.appendChild(a);
  });
}

addLink = function () {
  const name = document.getElementById("linkName").value;
  const url = document.getElementById("linkURL").value;

  if (!name || !url) return;

  links.push({ name, url });
  saveLinks();
  renderLinks();

  document.getElementById("linkName").value = "";
  document.getElementById("linkURL").value = "";
};

renderLinks();


let username = localStorage.getItem("username");

if (!username) {
  username = prompt("Masukkan nama kamu:");
  localStorage.setItem("username", username);
}

document.getElementById("greeting").textContent += ", " + username;


function toggleMode() {
  document.body.classList.toggle("dark");
}