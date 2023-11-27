let $ = document;
const inputElem = $.getElementById("itemInput");
const addButton = $.getElementById("addButton");
const clearButton = $.getElementById("clearButton");
const todoListElem = $.getElementById("todoList");
const slide = $.querySelector(".slide");
const parentEditTitleTodo = $.querySelector(".parent-edit-title-todo");
const inputEditTitle = $.querySelector(".input-edit-title");
const btn = $.querySelector(".button");

let todoSArray = [];

function addNewTodo() {
  if (
    inputElem.value == "" ||
    inputElem.value == " " ||
    inputElem.value == "  "
  ) {
    inputElem.placeholder = "Please type something";
    inputElem.value = "";
  } else {
    let newTodoTitle = inputElem.value.trim();

    let newTodoObj = {
      id: todoSArray.length + 1,
      title: newTodoTitle,
      complete: false,
    };

    inputElem.value = "";
    inputElem.focus();

    todoSArray.push(newTodoObj);
    setLocalStorage(todoSArray);
    todoSGenerator(todoSArray);
  }
}

function setLocalStorage(todoSList) {
  localStorage.setItem("todoS", JSON.stringify(todoSList));
}

function todoSGenerator(todoSList) {
  let newTodoLiElem,
    newTodoLabelElem,
    newTodoCompleteBtn,
    newTodoDeleteBtn,
    editBtn;

  todoListElem.innerHTML = "";

  todoSList.forEach(function (todo) {
    // li
    newTodoLiElem = $.createElement("li");
    newTodoLiElem.className = "completed well";
    newTodoLiElem.setAttribute("ondblclick", "editTitleTodo(" + todo + ");");

    // label
    newTodoLabelElem = $.createElement("label");
    newTodoLabelElem.innerHTML = todo.title;

    // CompleteBtn
    newTodoCompleteBtn = $.createElement("button");
    newTodoCompleteBtn.className = "btn btn-success";
    newTodoCompleteBtn.innerHTML = "Complete";
    newTodoCompleteBtn.setAttribute("onclick", "editTodo(" + todo.id + ");");

    if (todo.complete === true) {
      newTodoLiElem.className = "uncompleted well";
      newTodoCompleteBtn.innerHTML = "unComplete";
    }

    // DeleteBtn
    newTodoDeleteBtn = $.createElement("button");
    newTodoDeleteBtn.className = "btn btn-danger";
    newTodoDeleteBtn.innerHTML = "Delete";
    newTodoDeleteBtn.setAttribute("onclick", "removeTodo(" + todo.id + ");");

    // editBtn
    editBtn = $.createElement("button");
    editBtn.className = "btn btn-warning";
    editBtn.innerHTML = "Edit";
    editBtn.setAttribute("onclick", "editTitleTodo(" + todo.id + ");");

    newTodoLiElem.append(
      newTodoLabelElem,
      newTodoCompleteBtn,
      newTodoDeleteBtn,
      editBtn
    );

    todoListElem.append(newTodoLiElem);
  });
}

function editTitleTodo(todoId) {
  slide.setAttribute("style", "top: 0rem; opacity: 1; transition: .3s;");
  parentEditTitleTodo.setAttribute("style", "top: 12rem;");

  btn.addEventListener("click", function () {
    let localStorageTodoS = JSON.parse(localStorage.getItem("todoS"));
    todoSArray = localStorageTodoS;

    slide.setAttribute("style", "top: -100%; opacity: 0; transition: .3s;");
    parentEditTitleTodo.setAttribute("style", "top: -18rem;");
    let newTitle = inputEditTitle.value;

    // todoSArray.forEach(function (todo) {
    //   if (todo.id === todoId) {
    //     todo.title = newTitle;
    //   }
    // });

    let newTodoObj = {
      id: todoId,
      title: newTitle,
      complete: false,
    };

    let mainTodoIndex = todoSArray.findIndex(function (todo) {
      if (todo.id === todoId) {
        return todo.id === todoId;
      }
    });

    console.log(mainTodoIndex);
    todoSArray.splice(mainTodoIndex, 1, newTodoObj);
    setLocalStorage(todoSArray);
    todoSGenerator(todoSArray);
    // windowLoad();
  });
  mainTodoIndex = "";
}

function removeTodo(todoId) {
  let localStorageTodoS = JSON.parse(localStorage.getItem("todoS"));
  todoSArray = localStorageTodoS;

  let mainTodoIndex = todoSArray.findIndex(function (todo) {
    return todo.id === todoId;
  });

  todoSArray.splice(mainTodoIndex, 1);

  setLocalStorage(todoSArray);
  todoSGenerator(todoSArray);
}

function editTodo(todoId) {
  let localStorageTodoS = JSON.parse(localStorage.getItem("todoS"));
  todoSArray = localStorageTodoS;

  todoSArray.forEach(function (todo) {
    if (todo.id === todoId) {
      todo.complete = !todo.complete;
    }
  });

  setLocalStorage(todoSArray);
  todoSGenerator(todoSArray);
}

function getLocalStorage() {
  let localStorageTodoS = JSON.parse(localStorage.getItem("todoS"));

  if (localStorageTodoS) {
    todoSArray = localStorageTodoS;
  } else {
    todoSArray = [];
  }

  todoSGenerator(todoSArray);
}

function clearTodoS() {
  localStorage.removeItem("todoS");
  todoSArray = [];
  todoSGenerator(todoSArray);
}

function windowLoad() {
  window.reload();
}

window.addEventListener("load", getLocalStorage);
addButton.addEventListener("click", addNewTodo);
clearButton.addEventListener("click", clearTodoS);
inputElem.addEventListener("keydown", function (event) {
  if (event.code === "Enter") {
    addNewTodo();
  }
});

// function editTitleTodo(todoId) {
//     slide.setAttribute("style", "top: 0rem; opacity: 1; transition: .3s;");
//     parentEditTitleTodo.setAttribute("style", "top: 12rem;");

//     btn.addEventListener("click", function () {
//       let localStorageTodoS = JSON.parse(localStorage.getItem("todoS"));
//       todoSArray = localStorageTodoS;
//       slide.setAttribute("style", "top: -100%; opacity: 0; transition: .3s;");
//       parentEditTitleTodo.setAttribute("style", "top: -18rem;");
//       let newTitle = inputEditTitle.value;

//       todoSArray.forEach(function (todo) {
//         if (todo.id === todoId) {
//           todo.title = newTitle;
//         }
//       });

//       setLocalStorage(todoSArray);
//       todoSGenerator(todoSArray);
//       windowLoad()
//     });
//   }
