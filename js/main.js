const input = document.querySelector(".form-input");
const submitButton = document.querySelector(".form-button");
const todoInner = document.querySelector(".todo-inner");

let counter = localStorage.length;

for (key in localStorage) {
  console.log(key)
}

// for (let i = 1; i < 10; i++) {
//   let value = localStorage.getItem(`task-${i}`);
//   if (value) {
//     console.log(value)
//   }
// }

const postTask = todo => {
  const task = document.createElement("div");
  const text = document.createElement("p");
  const deleteButton = document.createElement("button");

  text.innerHTML = todo;

  todoInner.insertAdjacentElement("beforeend", task);
  task.insertAdjacentElement("beforeend", text);
  task.insertAdjacentElement("beforeend", deleteButton);
  
  task.classList.add(`task-${counter}`);

  localStorage.setItem(`task-${counter}`, todo);

  counter += 1;

  task.addEventListener("click", () => {
    task.style.textDecoration = "line-through"
  }) 

  deleteButton.addEventListener("click", () => {
    deleteButton.closest("div").remove();
    localStorage.removeItem(deleteButton.closest("div").className);
  })
}

submitButton.addEventListener("click", e => {
  e.preventDefault();
  postTask(input.value);
  input.value = "";
})
