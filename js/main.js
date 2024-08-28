const input = document.querySelector(".form-input");
const submitButton = document.querySelector(".form-button");
const todoInner = document.querySelector(".todo-inner");
const deleteAllButton = document.querySelector(".delete-all-btn");
const markAllAsCompleted = document.querySelector(".mark-as-complited");
const confirmation = document.querySelector(".confirmation");
const confirmBtn = document.querySelector(".confirmation-btn");

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

    deleteButton.innerHTML = '<svg width="24"height="24"viewBox="0 0 24 24"fill="none"xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd"clip-rule="evenodd"d="M17 6V5C17 3.89543 16.1046 3 15 3H9C7.89543 3 7 3.89543 7 5V6H4C3.44772 6 3 6.44772 3 7C3 7.55228 3.44772 8 4 8H5V19C5 20.6569 6.34315 22 8 22H16C17.6569 22 19 20.6569 19 19V8H20C20.5523 8 21 7.55228 21 7C21 6.44772 20.5523 6 20 6H17ZM15 5H9V6H15V5ZM17 8H7V19C7 19.5523 7.44772 20 8 20H16C16.5523 20 17 19.5523 17 19V8Z"fill="currentColor"/></svg>'
  
    text.innerHTML = todoArr[key].todo;
  
    todoInner.insertAdjacentElement("beforeend", task);
    task.insertAdjacentElement("beforeend", text);
    task.insertAdjacentElement("beforeend", deleteButton);  
  
    let temp = deleteButton.closest("div").getElementsByTagName("p")[0];
  
    temp.setAttribute("id", `${key}`);
    temp.classList.add("todo");

    task.setAttribute("id", `${key}`);
    task.setAttribute("draggable", "true");

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
      confirmation.style.display = "flex";
      confirmation.classList.add("confirmation-ease-in");
      localStorage.setItem("queue", JSON.stringify(todoArr[temp]));

      setTimeout(() => {
        localStorage.removeItem("queue");
        confirmation.classList.remove("confirmation-ease-in");
        confirmation.classList.add("confirmation-ease-out");
        setTimeout(() => {
          confirmation.style.display = "none";
          confirmation.classList.remove("confirmation-ease-out");
        }, 200);
      }, 3000)

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


confirmBtn.addEventListener("click", () => {
  const temp = localStorage.getItem("queue");
  todoArr.splice();
  console.log(temp);
});

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

