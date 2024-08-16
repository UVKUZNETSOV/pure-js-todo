const input = document.querySelector(".form-input");
const submitButton = document.querySelector(".form-button");
const todoInner = document.querySelector(".todo-inner");

const todoArr = [];

const postTask = todo => {
  const task = document.createElement("div");
  const text = document.createElement("p");
  const deleteButton = document.createElement("button");

  todoArr.push(todo);

  localStorage.setItem("todos", JSON.stringify(todoArr));

  text.innerHTML = todo;

  todoInner.insertAdjacentElement("beforeend", task);
  task.insertAdjacentElement("beforeend", text);
  task.insertAdjacentElement("beforeend", deleteButton);

  task.addEventListener("click", () => {
    task.classList.toggle('completed');
  }) 

  deleteButton.addEventListener("click", () => {
    deleteButton.closest("div").remove();
  })
}

submitButton.addEventListener("click", e => {
  e.preventDefault();
  postTask(input.value);
  input.value = "";
})
