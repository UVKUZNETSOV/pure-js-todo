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

  deleteButton.classList.add("delete-btn");

  text.innerHTML = todoArr[key];

  todoInner.insertAdjacentElement("beforeend", task);
  task.insertAdjacentElement("beforeend", text);
  task.insertAdjacentElement("beforeend", deleteButton);  

  deleteButton.addEventListener("click",  () => {
    deleteButton.closest("div").remove();
    localStorage.setItem("todos", JSON.stringify(todoArr.filter(todo => todo !== todoArr[key])))
  })
}

const deleteButton = document.querySelectorAll(".delete-btn");

deleteButton.forEach(btn => {
  btn.addEventListener("click", () => {
    
  })
})




const postTask = todo => {
  const task = document.createElement("div");
  const text = document.createElement("p");
  const deleteButton = document.createElement("button");

  deleteButton.classList.add("delete-btn");

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
    for (key in todoArr) {
      todoArr = todoArr.filter(todo => todo !== todoArr[key]);
    }
    localStorage.setItem("todos", JSON.stringify(todoArr));
  })
}

// submitButton.addEventListener("click", e => {
//   e.preventDefault();
//   postTask(input.value);
//   input.value = "";
// })


// ["1","2","3","4"]