const input = document.querySelector(".form-input");
const submitButton = document.querySelector(".form-button");
const todoInner = document.querySelector(".todo-inner");

let counter = localStorage.length;

const render = () => {
  for (key in todoArr) {
    const task = document.createElement("div");
    const text = document.createElement("p");
    const deleteButton = document.createElement("button");

    text.innerHTML = localStorage.getItem(i);

    todoInner.insertAdjacentElement("beforeend", task);
    task.insertAdjacentElement("beforeend", text);
    task.insertAdjacentElement("beforeend", deleteButton);  
  
    let temp = deleteButton.closest("div").getElementsByTagName("p")[0];
  
    temp.setAttribute("id", `${key}`);
    temp.classList.add("todo");

    if (todoArr[key].completed) {
      temp.classList.toggle("completed");
    }
  }

  const deleteButton = document.querySelectorAll(".delete-btn");
  const todo = document.querySelectorAll(".todo");

  todo.forEach(todo => {
    todo.addEventListener("click", () => {
      todo.classList.toggle("completed");
      todoArr[todo.id].completed = !todoArr[todo.id].completed;
      localStorage.setItem("todos", JSON.stringify(todoArr));
      todoInner.innerHTML = '';
      render();
    })
  })


  deleteButton.forEach(btn => {
    const temp = parseInt(btn.closest("div").getElementsByTagName("p")[0].id);
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
    todoArr.push({todo: input.value, completed: false});
    localStorage.setItem("todos", JSON.stringify(todoArr));
    todoInner.innerHTML = '';
    input.value = "";
    render();
  }
})

deleteAllButton.addEventListener("click", () => {
  todoInner.innerHTML = '';
  todoArr = [];
  localStorage.setItem("todos", todoArr);
})

markAllAsCompleted.addEventListener("click", () => {
  for (key in todoArr) {
    todoArr[key].completed = true;
    localStorage.setItem("todos", JSON.stringify(todoArr));
    todoInner.innerHTML = '';
    render();
  }
})
