let $ = document;
const inputElem = $.getElementById("itemInput");
const addButton = $.getElementById("addButton");
const clearButton = $.getElementById("clearButton");
const todoListElem = $.getElementById("todoList");

let todosArray = [];

function addNewTodo() {

  if (inputElem.value == "") {
    inputElem.placeholder = "Please type something";
  } else {
    let newTodoTitle = inputElem.value;

    let newTodoObj = {
      id: todosArray.length + 1,
      title: newTodoTitle,
      complete: false,
    };
  
    inputElem.value = "";
  
    todosArray.push(newTodoObj);
    setLocalStorage(todosArray);
    todosGenerator(todosArray);
  
    inputElem.focus();
  
  }
}

function setLocalStorage(todosList) {
  localStorage.setItem("todos", JSON.stringify(todosList));
}

function todosGenerator(todosList) {
  let newTodoLiElem, newTodoLabalElem, newTodoCompleteBtn, newTodoDeleteBtn;

  todoListElem.innerHTML = "";

  todosList.forEach(function (todo) {
    newTodoLiElem = $.createElement("li");
    newTodoLiElem.className = "completed well";

    newTodoLabalElem = $.createElement("label");
    newTodoLabalElem.innerHTML = todo.title;

    newTodoCompleteBtn = $.createElement("button");
    newTodoCompleteBtn.className = "btn btn-success";
    newTodoCompleteBtn.innerHTML = "Complete";
    newTodoCompleteBtn.setAttribute("onclick", "editTodo(" + todo.id + ")");

    // Complete
    if (todo.complete === true) {
      newTodoLiElem.className = "uncompleted well";
      newTodoCompleteBtn.innerHTML = "unComplete";
    }

    newTodoDeleteBtn = $.createElement("button");
    newTodoDeleteBtn.className = "btn btn-danger";
    newTodoDeleteBtn.innerHTML = "Delete";
    newTodoDeleteBtn.setAttribute("onclick", "removeTodo(" + todo.id + ")");

    newTodoLiElem.append(
      newTodoLabalElem,
      newTodoCompleteBtn,
      newTodoDeleteBtn
    );

    todoListElem.append(newTodoLiElem);
  });
}

function editTodo(todoId) {
  let localStorageTodos = JSON.parse(localStorage.getItem("todos"));
  todosArray = localStorageTodos;

  todosArray.forEach(function (todo) {
    if (todo.id === todoId) {
      todo.complete = !todo.complete;
    }
  });

  setLocalStorage(todosArray);
  todosGenerator(todosArray);
}

function removeTodo(todoId) {
  let localStorageTodos = JSON.parse(localStorage.getItem("todos"));
  todosArray = localStorageTodos;

  let mainTodoIndex = todosArray.findIndex(function (todo) {
    return todoId === todo.id;
  });

  todosArray.splice(mainTodoIndex, 1);

  todosGenerator(todosArray);
  setLocalStorage(todosArray);
}

function getLocalStorage() {
  let localStorageTodos = JSON.parse(localStorage.getItem("todos"));

  if (localStorageTodos) {
    todosArray = localStorageTodos;
  } else {
    todosArray = [];
  }

  todosGenerator(todosArray);
}

function clearTodos() {
  todosArray = [];
  todosGenerator(todosArray);
  // localStorage.clear()
  localStorage.removeItem("todos");
}

window.addEventListener("load", getLocalStorage);
addButton.addEventListener("click", addNewTodo);
clearButton.addEventListener("click", clearTodos);
inputElem.addEventListener("keydown", function (event) {
  if (event.code === "Enter") {
    addNewTodo();
  }
});
