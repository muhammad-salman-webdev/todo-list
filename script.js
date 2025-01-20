const form = document.getElementById("todo-form");
const tasks = document.getElementById("tasks-list");

let counter = 0;

form.addEventListener("submit", (_form) => {
  // Prevent the form to submit
  _form.preventDefault();

  // Get the task
  const task = _form.target[0].value;
  console.log(task);
  counter++;
  // Add the Value into the DOM
  const newTask = `
        <div class="item-box">
        <strong> ${counter} </strong>
          <p> ${task} </p>
          <div class="options">
            <div class="option">
              <i class="fas fa-pen"></i>
            </div>

            <div class="option">
              <i class="fa-solid fa-trash"></i>
            </div>
          </div>
        </div>
        `;
  tasks.innerHTML += newTask;
  _form.target[0].value = "";
});
