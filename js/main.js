const input = document.querySelector(".form-input");
const submitButton = document.querySelector(".form-button");
const todoInner = document.querySelector(".todo-inner");

let todoArr = [];

if (localStorage.getItem("todos")) {
  todoArr = JSON.parse(localStorage.getItem("todos"));
}

const render = () => {
  for (key in todoArr) {
    const task = document.createElement("div");
    const text = document.createElement("p");
    const deleteButton = document.createElement("button");
  
    deleteButton.classList.add("delete-btn");
  
    text.innerHTML = todoArr[key];
  
    todoInner.insertAdjacentElement("beforeend", task);
    task.insertAdjacentElement("beforeend", text);
    task.insertAdjacentElement("beforeend", deleteButton);  
  
    let temp = deleteButton.closest("div").getElementsByTagName("p")[0];
  
    temp.classList.add(`${key}`);
  }

  const deleteButton = document.querySelectorAll(".delete-btn");

  deleteButton.forEach(btn => {
    const temp = parseInt(btn.closest("div").getElementsByTagName("p")[0].className);
    btn.addEventListener("click", () => {
      todoArr.splice(temp, 1);
      localStorage.setItem("todos", JSON.stringify(todoArr));
      todoInner.innerHTML = '';
      render();
    })
  })
}

render();

submitButton.addEventListener("click", e => {
  e.preventDefault();
  if (input.value) {
    todoArr.push(input.value);
    localStorage.setItem("todos", JSON.stringify(todoArr));
    todoInner.innerHTML = '';
    input.value = "";
    render();
  }
})