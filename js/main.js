const input = document.querySelector(".form-input");
const submitButton = document.querySelector(".form-button");
const todoInner = document.querySelector(".todo-inner");
const deleteAllButton = document.querySelector(".delete-all-btn");
const markAllAsCompleted = document.querySelector(".mark-as-complited");

let todoArr = [];

if (localStorage.getItem("todos")) {
  todoArr = JSON.parse(localStorage.getItem("todos"));
}

const render = (translate, id) => {

  todoInner.classList.remove("disappear");

  for (key in todoArr) {
    const task = document.createElement("div");
    const text = document.createElement("p");
    const deleteButton = document.createElement("button");
  
    deleteButton.classList.add("delete-btn");
  
    text.innerHTML = todoArr[key].todo;
  
    todoInner.insertAdjacentElement("beforeend", task);
    task.insertAdjacentElement("beforeend", text);
    task.insertAdjacentElement("beforeend", deleteButton);  
  
    let temp = deleteButton.closest("div").getElementsByTagName("p")[0];
  
    temp.setAttribute("id", `${key}`);
    temp.classList.add("todo");
    task.setAttribute("id", `${key}`);

    if (todoArr[key].completed) {
      temp.classList.toggle("completed");
    }

    if (translate && (key >= id)) {
      task.classList.add("animated");
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
      btn.closest("div").classList.add("disappear");
      setTimeout(() => {
        todoInner.innerHTML = '';
        render(true, btn.closest("div").id);
      }, 100);
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
  todoArr = [];
  localStorage.setItem("todos", todoArr);
  todoInner.classList.add("disappear");
  setTimeout(() => {
    todoInner.innerHTML = '';
  }, 100);

})

markAllAsCompleted.addEventListener("click", () => {
  for (key in todoArr) {
    todoArr[key].completed = true;
    localStorage.setItem("todos", JSON.stringify(todoArr));
    todoInner.innerHTML = '';
    render(true);
  }
})

