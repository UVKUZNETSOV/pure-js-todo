const input = document.querySelector(".form-input");
const submitButton = document.querySelector(".form-button");
const todoInner = document.querySelector(".todo-inner");

let counter = localStorage.length;

const render = () => {
  for (let i = 0; i < localStorage.length; i++) {
    const task = document.createElement("div");
    const text = document.createElement("p");
    const deleteButton = document.createElement("button");

    text.innerHTML = localStorage.getItem(i);

    todoInner.insertAdjacentElement("beforeend", task);
    task.insertAdjacentElement("beforeend", text);
    task.insertAdjacentElement("beforeend", deleteButton);

    task.classList.add(i);

    deleteButton.addEventListener("click", () => {
      deleteButton.closest("div").remove();
      localStorage.removeItem(deleteButton.closest("div").className);
    })
  }
}

render();

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
    task.classList.toggle("completed");
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
