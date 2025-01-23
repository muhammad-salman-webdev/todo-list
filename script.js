// const todoForm = document.getElementById("todo-form");
// const taskList = document.getElementById("tasks-list");

// let count = 0;
// todoForm.addEventListener("submit", (_form) => {
//   _form.preventDefault();
//   const task = _form.target[0].value;

//   count++;

//   const newTask = `<div class="item-box">
//  <strong>${count}</strong>
//             <p> ${task} </p>
//             <div class="options">
//               <div class="option edit-option">
//                 <i class="fas fa-pen"></i>
//               </div>

//               <div class="option delete-option">
//                 <i class="fa-solid fa-trash"></i>
//               </div>
//             </div>
//           </div>`;

//   taskList.innerHTML += newTask;
//   _form.target[0].value = "";

//   addCrudOptions();
// });

// //

// function addCrudOptions() {
//   const tasks = taskList.querySelectorAll("div.item-box");
//   console.log("___________________________________");

//   tasks.forEach((task, index) => {
//     const EditBtn = task.querySelector(".options > .option.edit-option");
//     const deleteBtn = task.querySelector(".options > .option.delete-option");

//     EditBtn.addEventListener("click" , () => {

//     })
//   });
// }

const todoForm = document.getElementById("todo-form");
const taskList = document.getElementById("tasks-list");
let count = 0;
todoForm.addEventListener("submit", (_form) => {
  _form.preventDefault();
  const task = _form.target[0].value;
  count++;

  const newTask = `<div class="item-box">
  <strong>${count}</strong>
              <p>${task} </p>
              <div class="options">
                <div class="option">
                  <i class="fas fa-pen"></i>
                </div>

                <div class="option">
                  <i class="fa-solid fa-trash"></i>
                </div>
              </div>
            </div>`;

  taskList.innerHTML += newTask;
  _form.target[0].value = "";
});
