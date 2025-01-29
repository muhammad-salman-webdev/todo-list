// Get the form element for the task input and the task list container
const todoForm = document.getElementById("todo-form");
const taskList = document.getElementById("tasks-list");
let count = 0; // Initialize task count to keep track of task numbers

let isEditing = false;

let editingItemIndex = 0;

// Add an event listener to handle form submission
todoForm.addEventListener("submit", (_form) => {
  _form.preventDefault(); // Prevent default form submission behavior
  const task = _form.target[0].value; // Get the task input value from the form

  if (isEditing === true) {
    // edit the item
    const allItem = taskList.querySelectorAll(".item-box");
    allItem[editingItemIndex].querySelector("p").innerText = task;

    isEditing = false;
    todoForm.classList.remove("isEditing");
  } else {
    count++; // Increment the task count for task numbering

    // Create the task item markup with the task number, task text, and options (edit/delete)
    const newTask = `<div class="item-box">
  <strong>${count}</strong>  <!-- Task number -->
              <p> ${task} </p>  <!-- Task description -->
              <div class="options">
                <div class="option edit-option">
                  <i class="fas fa-pen"></i> <!-- Edit icon -->
                </div>
 
                <div class="option delete-option">
                  <i class="fa-solid fa-trash"></i> <!-- Delete icon -->
                </div>
              </div>
            </div>`;

    // Append the new task to the task list
    taskList.innerHTML += newTask;

    // Call the function to attach CRUD event listeners to task options
    addCrudOptions();
  }

  // Clear the input field for the next task
  _form.target[0].value = "";
});

// Function to add event listeners for edit and delete options
function addCrudOptions() {
  // Select all task items
  const taskItem = taskList.querySelectorAll("div.item-box");

  // Loop through each task item to attach events
  taskItem.forEach((task, index) => {
    const editButton = task.querySelector(".options > .option.edit-option"); // Edit button
    const deleteButton = task.querySelector(".options > .option.delete-option"); // Delete button

    // Handle the edit functionality when the edit button is clicked
    editButton.addEventListener("click", () => {
      console.log(index, "this should be Edited"); // Placeholder for edit logic

      const input = todoForm.querySelector("input");
      input.value = task.querySelector("p").textContent;
      input.focus();
      isEditing = true;
      editingItemIndex = index;
      todoForm.classList.add("isEditing");
    });

    // Handle the delete functionality when the delete button is clicked
    deleteButton.addEventListener("click", () => {
      taskItem[index].remove(); // Remove the selected task item

      // Update the task numbers after deletion
      const upDatedTask = taskList.querySelectorAll("div.item-box");

      upDatedTask.forEach((_task, _index) => {
        _task.querySelector("strong").innerText = _index + 1; // Update task numbering
      });
    });
  });
}
