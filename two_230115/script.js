const wrapper = document.querySelector(".wrapper");
const input = document.querySelector(".todo__field");
const addButton = document.querySelector(".todo__add_button");
const todoItemList = document.querySelector(".todo_item__list");
const removeAllBtn = document.querySelector(".todo__remove_all_button");

const deleteTodo = (e) => {
  const parent = e.target.parentNode;
  todoItemList.removeChild(parent);
  const todoInStorage = JSON.parse(localStorage.getItem("TODO") || "[]");

  const deleted = todoInStorage.filter((e) => {
    return e.id !== Number(parent.id);
  });

  const indexing = deleted.map((e, idx) => {
    return {
      id: idx + 1,
      value: e.value,
    };
  });

  localStorage.setItem("TODO", JSON.stringify(indexing));
  deleteAll();
  loadTodo();
};

const deleteAll = () => {
  while (todoItemList.hasChildNodes()) {
    todoItemList.removeChild(todoItemList.firstChild);
  }
};

const addTodo = (text, isSave, todoId) => {
  const todoInStorage = JSON.parse(localStorage.getItem("TODO") || "[]");

  const li = document.createElement("li");
  const span = document.createElement("span");
  span.innerText = text;

  const delButton = document.createElement("button");
  delButton.innerText = "DELETE";
  delButton.addEventListener("click", deleteTodo);

  li.appendChild(span);
  li.appendChild(delButton);

  if (todoId) {
    li.id = todoId;
    todoItemList.appendChild(li);
  } else {
    li.id = todoInStorage.length + 1;
    todoItemList.appendChild(li);
  }

  if (isSave) {
    localStorage.setItem(
      "TODO",
      JSON.stringify([
        ...todoInStorage,
        { id: todoInStorage.length + 1, value: text },
      ])
    );
  }
  input.value = "";
};

const loadTodo = () => {
  const todoInStorage = JSON.parse(localStorage.getItem("TODO") || "[]");

  for (let i = 0; i < todoInStorage.length; i++) {
    addTodo(todoInStorage[i].value, false, todoInStorage[i].id);
  }
};

const init = () => {
  loadTodo();
  addButton.addEventListener("click", () => addTodo(input.value, true, false));
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addTodo(input.value, true, false);
    }
  });

  removeAllBtn.addEventListener("click", () => {
    deleteAll();
    localStorage.removeItem("TODO");
  });
};

init();
