const input = document.querySelector(".form-input");
const submitButton = document.querySelector(".form-button");
const todoInner = document.querySelector(".todo-inner");

let todoArr = [];

if (localStorage.getItem("todos")) {
  todoArr = JSON.parse(localStorage.getItem("todos"));
}

for (key in todoArr) {
  const task = document.createElement("div");
  const text = document.createElement("p");
  const deleteButton = document.createElement("button");

  text.innerHTML = todoArr[key];

  todoInner.insertAdjacentElement("beforeend", task);
  task.insertAdjacentElement("beforeend", text);
  task.insertAdjacentElement("beforeend", deleteButton);

  task.addEventListener("click", () => {
    task.classList.toggle('completed');
  }) 

  console.log(todoArr)

  deleteButton.addEventListener("click", () => {
    deleteButton.closest("div").remove();
    todoArr = todoArr.filter(todo => todo !== todoArr[key]);
    localStorage.setItem("todos", JSON.stringify(todoArr))
  })
}

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
    console.log("OK")
    deleteButton.closest("div").remove();
  })
}

submitButton.addEventListener("click", e => {
  e.preventDefault();
  postTask(input.value);
  input.value = "";
})
