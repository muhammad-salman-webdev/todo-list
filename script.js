const todoForm = document.getElementById("todo-form");
const taskList = document.getElementById("tasks-list");
const input = todoForm.querySelector("input");
const totalTasksLabel = document.querySelector(".footer-section .tasks span");

const notificationElem = document.getElementById("notificationList");

let count = 0;
let editingItemIndex = 0;
let isEditing = false;

let notiCount = 0;

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

  if (type === "added") {
    notiClass = "green";
    notiIcon = "fa-solid fa-check";
    notiTitle = "Added";
    notiText = "List Item Added!";
  } else if (type === "edited") {
    notiClass = "blue";
    notiTitle = "Edited";
    notiText = "List Item Edited!";
  } else if (type === "deleted") {
    notiClass = "red";
    notiTitle = "Deleted";
    notiText = "List Item Deleted!";
  } else if (type === "error") {
    notiClass = "yellow";
    notiTitle = "Error";
    notiText = "Something Happened Wrong!";
  }

  notiCount++;
  // const newNoti = `
  //   <div class="notification-item ${notiClass} notification-no-${notiCount}">
  //     <div class="icon">
  //       <i class="fa-solid fa-check"></i>
  //     </div>

  //     <div class="notification-content">
  //       <h3>${notiTitle}</h3>
  //       <span>${notiText}</span>
  //     </div>

  //     <div class="close-icon">
  //       <i class="fa-regular fa-xmark"></i>
  //     </div>
  //   </div>
  // `;

  // Noitication Item
  const _notiItem = document.createElement("div");
  _notiItem.classList.add(
    "notification-item",
    notiClass,
    `notification-no-${notiCount}`
  );

  // Icon
  const _notiIcon = document.createElement("div");
  _notiIcon.classList.add("icon");

  const _icon = document.createElement("i");
  _icon.classList.add("fa-solid", "fa-check");

  _notiIcon.appendChild(_icon);
  // Icon

  // Content
  const _content = document.createElement("div");
  _content.classList.add("notification-content");

  const _h3 = document.createElement("h3");
  _h3.textContent = notiTitle;

  const _span = document.createElement("span");
  _span.textContent = notiText;

  _content.append(_h3, _span);

  // Content

  // close Icon
  const _closeIcon = document.createElement("div");
  _closeIcon.classList.add("close-icon");

  const _icon2 = document.createElement("i");
  _icon2.classList.add("fa-regular", "fa-xmark");

  _closeIcon.appendChild(_icon2);

  // close Icon

  // Adding
  _notiItem.append(_notiIcon, _content, _closeIcon);

  console.log(_notiItem);
  // Adding

  // notificationElem.innerHTML += newNoti;
  notificationElem.appendChild(_notiItem);

  // const notificationXmark = document.querySelectorAll(".close-icon .fa-xmark");
  // notificationXmark.forEach((value, index) => {
  //   value.addEventListener("click", () => {
  //     notificationXmark[index].closest(".notification-item").remove(); // Sirf target notification remove hogi
  //   });
  // });

  const _noti = document.querySelector(`.notification-no-${notiCount}`);

  _noti.querySelector(".close-icon i").addEventListener("click", () => {
    _noti.remove();
  });

  setTimeout(() => {
    _noti.remove();
  }, 2500);
}
