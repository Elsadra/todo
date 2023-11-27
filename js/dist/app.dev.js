"use strict";

var $ = document;
var inputElem = $.querySelector("#itemInput");
var addButton = $.querySelector("#addButton");
var clearButton = $.querySelector("#clearButton");
var todoListElem = $.querySelector("#todoList");
var todoSArray = [];

function addNewTodo() {
  var newTodoTitle = inputElem.value;
  var newTodoObj = {
    id: todoSArray.length + 1,
    title: newTodoTitle,
    complete: false
  };
  todoSArray.push(newTodoObj);
  todosGenerator(todoSArray);
  setLocalStorage(todoSArray);
  inputElem.value = "";
  inputElem.focus();
}

function setLocalStorage(todosList) {
  localStorage.setItem("todo", JSON.stringify(todosList));
}

function todosGenerator(todosList) {
  var newTodoLiElem, newTodoLabalElem, newTodoCompleteBtn, newTodoDeleteBtn;
  todoListElem.innerHTML = "";
  todosList.forEach(function (todo) {
    newTodoLiElem = $.createElement("li");
    newTodoLiElem.className = "completed well";
    newTodoLabalElem = $.createElement("label");
    newTodoLabalElem.innerHTML = todo.title;
    newTodoCompleteBtn = $.createElement("button");
    newTodoCompleteBtn.className = "btn btn-success";
    newTodoCompleteBtn.innerHTML = "Complete";
    newTodoDeleteBtn = $.createElement("button");
    newTodoDeleteBtn.className = "btn btn-danger";
    newTodoDeleteBtn.innerHTML = "Delete";
    newTodoLiElem.append(newTodoLabalElem, newTodoCompleteBtn, newTodoDeleteBtn);
    todoListElem.append(newTodoLiElem);
  });
}

function getLocalStorage() {
  var localStorageTodos = JSON.parse(localStorage.getItem("todo"));

  if (localStorageTodos) {
    todoSArray = localStorageTodos;
  } else {
    todoSArray = [];
  }

  todosGenerator(todoSArray);
}

function clearTodos() {
  todoSArray = [];
  todosGenerator(todosArray);
  localStorage.removeItem("todo");
}

window.addEventListener("load", getLocalStorage);
addButton.addEventListener("click", addNewTodo);
clearButton.addEventListener("click", clearTodos);