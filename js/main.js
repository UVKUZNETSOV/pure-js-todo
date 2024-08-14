const input = document.querySelector(".form-input");
const submitButton = document.querySelector(".form-button");
const todoInner = document.querySelector(".todo-inner");

let counter = localStorage.length;

// for (key in localStorage) {
//   console.log(key)
// }

const postTask = todo => {
  const task = document.createElement("div");
  const text = document.createElement("p");
  const deleteButton = document.createElement("button");

  text.innerHTML = todo;

  todoInner.insertAdjacentElement("beforeend", task);
  task.insertAdjacentElement("beforeend", text);
  task.insertAdjacentElement("beforeend", deleteButton);

  task.classList.add(`task-0`);
  
  while(true) {
    if (localStorage.includes(task.className)) {
      console.log("includes")
    } else break;
  }

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
