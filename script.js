const todoForm = document.getElementById("todo-form");
const taskList = document.getElementById("tasks-list");
const input = todoForm.querySelector("input");
const totalTasksLabel = document.querySelector(".footer-section .tasks span");

const notificationElem = document.getElementById("notificationList");

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
  let notiClass = "";
  let notiIcon = "";
  let notiTitle = "";
  let notiText = "";
  // Green
  if (type === "added") {
    notiClass = "green";
    notiIcon = "check";
    notiTitle = "Added";
    notiText = "List Item Added!";
  }
  // Blue
  else if (type === "edited") {
    notiClass = "blue";
    notiText = "List Item Edited!";
  }
  // Red
  else if (type === "deleted") {
    notiClass = "red";
    notiText = "List Item Deleted!";
  }
  // Yellow
  else if (type === "error") {
    notiClass = "yellow";
    notiText = "Something Happened Wrong!";
  }

  const newNoti = `
            <div class="notification-item ${notiClass}">
              <div class="icon">
                <i class="fa-solid fa-check"></i>
              </div>

              <div class="notification-content">
                <h3>Added</h3>

                <span>${notiText}</span>
              </div>
              <div class="close-icon">
                <i class="fa-regular fa-xmark"></i>
              </div>
            </div>
  `;

  notificationElem.innerHTML += newNoti;
}
