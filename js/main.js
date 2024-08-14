const input = document.querySelector(".form-input");
const submitButton = document.querySelector(".form-button");
const todoInner = document.querySelector(".todo-inner");

const arr = [];

const postTask = todo => {
  const task = document.createElement("div");
  const text = document.createElement("p");
  const deleteButton = document.createElement("button");

  let counter = 0;

  text.innerHTML = todo;

  todoInner.insertAdjacentElement("beforeend", task);
  task.insertAdjacentElement("beforeend", text);
  task.insertAdjacentElement("beforeend", deleteButton);
  
  for (key in arr) {
    if (key == counter) {
      counter += 1;
      console.log(counter)
    } else arr.push(counter);
  }

  
  // localStorage.setItem(counter, todo);

  console.log(arr)

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
