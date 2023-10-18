
// dom
const taskForm = document.getElementById("task-form");
const newTaskInput = document.getElementById("new-task");
const taskList = document.getElementById("task-list");

// array tareas
let tasks = [];

// agregar tarea
function addTask(taskText) {
  const task = {
    text: taskText,
    completed: false
  };

  // tarea array
  tasks.push(task);

  updateTaskList();

  newTaskInput.value = "";
}

// tarea completa
function completeTask(index) {
  tasks[index].completed = !tasks[index].completed;
  updateTaskList();
}

// eliminar tarea
function deleteTask(index) {
  tasks.splice(index, 1);
  updateTaskList();
}

// actualizar lista DOM
function updateTaskList() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const taskItem = document.createElement("li");
    taskItem.innerHTML = `
      <input type="checkbox" ${task.completed ? "checked" : ""}>
      <span class="${task.completed ? "completed" : ""}">${task.text}</span>
      <button class="delete-button">Eliminar</button>
    `;

    const checkbox = taskItem.querySelector("input");
    checkbox.addEventListener("change", () => completeTask(index));

    const deleteButton = taskItem.querySelector(".delete-button");
    deleteButton.addEventListener("click", () => deleteTask(index));

    taskList.appendChild(taskItem);
  });
}

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const taskText = newTaskInput.value.trim();
  if (taskText !== "") {
    addTask(taskText);
  }
});

updateTaskList();
