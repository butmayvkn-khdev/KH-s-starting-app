const positiveImg = document.getElementById("positive-img");
const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");

let todos = JSON.parse(localStorage.getItem("todos") || "[]");

function save() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function render() {
  list.innerHTML = "";
  todos.forEach((t, i) => {
   const hasDoneTask = todos.some(t => t.done);
positiveImg.style.display = hasDoneTask ? "block" : "none";

    const li = document.createElement("li");
    if (t.done) li.classList.add("Show");

    const text = document.createElement("span");
    text.textContent = t.text;

    const actions = document.createElement("div");

    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = t.done ? "Undo" : "Show";
    toggleBtn.onclick = () => {
      todos[i].done = !todos[i].done;
      save();
      render();
    };

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.onclick = () => {
      todos.splice(i, 1);
      save();
      render();
    };

    actions.appendChild(toggleBtn);
    actions.appendChild(delBtn);

    li.appendChild(text);
    li.appendChild(actions);
    list.appendChild(li);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  todos.push({ text, done: false });
  input.value = "";
  save();
  render();
});

render();