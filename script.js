const todoForm = document.getElementById("todo-form");
const taskList = document.getElementById("tasks-list");
const input = todoForm.querySelector("input");
const totalTasksLabel = document.querySelector(".footer-section .tasks span");

let count = 0;
let editingItemIndex = 0;
let isEditing = false;

todoForm.addEventListener("submit", (_form) => {
  _form.preventDefault();

  const task = input.value;
  count++;
  if (isEditing) {
    const allItem = taskList.querySelectorAll(".item-box");
    if (allItem[editingItemIndex]) {
      allItem[editingItemIndex].querySelector("p").innerText = task;
      showNotification("edited");
    } else {
      showNotification("error");
    }
    todoForm.classList.remove("isEditing");
    isEditing = false;
  } else {
    const newTask = `<div class="item-box">
      <strong>${count}</strong>
      <p>${task}</p>
      <div class="options">
        <div class="option edit-button">
          <i class="fas fa-pen"></i>
        </div>

        <div class="option delete-button">
          <i class="fa-solid fa-trash"></i>
        </div>
      </div>
    </div>`;
    taskList.innerHTML += newTask;
    addCrudOption();
    updateTotalTasksLabel();
    showNotification("added");
    // totalTasksLabel.innerText = count;
  }

  input.value = "";
});

function addCrudOption() {
  const taskItems = taskList.querySelectorAll(".item-box");
  taskItems.forEach((task, index) => {
    const editButton = task.querySelector(".options .option.edit-button");

    editButton.addEventListener("click", () => {
      editingItemIndex = index;
      isEditing = true;
      input.value = task.querySelector("p").innerText;
      input.focus();
      todoForm.classList.add("isEditing");
    });

    const deleteButton = task.querySelector(".options .option.delete-button");
    deleteButton.addEventListener("click", () => {
      taskItems[index].remove();
      showNotification("deleted");

      const upDatedTask = taskList.querySelectorAll(".item-box");

      if (upDatedTask.length > 0) {
        upDatedTask.forEach((_task, _index) => {
          _task.querySelector("strong").innerText = _index + 1;
          count = _index + 1;
          updateTotalTasksLabel();
        });
      } else {
        count = 0;
      }
    });
  });
}

function updateTotalTasksLabel() {
  totalTasksLabel.innerText = count;
}

const clearAllButton = document.querySelector(".footer-section button");

clearAllButton.addEventListener("click", () => {
  taskList.innerHTML = ""; // Remove all task items
  count = 0;
  updateTotalTasksLabel();
});

function showNotification(type) {
  console.log(type);
}
