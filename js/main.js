const input = document.querySelector(".form-input");
const submitButton = document.querySelector(".form-button");
const todoInner = document.querySelector(".todo-inner");

const postTask = todo => {
  const task = document.createElement("div");
  const text = document.createElement("p");
  const deleteButton = document.createElement("button");

  text.innerHTML = todo;

  todoInner.insertAdjacentElement("beforeend", task);
  task.insertAdjacentElement("beforeend", text);
  task.insertAdjacentElement("beforeend", deleteButton);

  let index = 0;

  for (let i = 0; i < localStorage.length; i++) {
    if (parseInt(localStorage.key(i)) == index) {
      index += 1;
    }
  }

  console.log(index)

  localStorage.setItem(index, todo);

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
