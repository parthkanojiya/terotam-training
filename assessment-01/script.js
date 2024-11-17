const home = document.querySelector(".home");
const formOpenBtn = document.querySelector("#form-open");
const formCloseBtn = document.querySelector(".form_close");
const formContainer = document.querySelector(".form_container");
const todoContainer = document.getElementById("todo-container");
const signupBtn = document.querySelector("#signup");
const loginBtn = document.querySelector("#login");
const loginOutBtn = document.getElementById("logout");

formOpenBtn.addEventListener("click", () => home.classList.add("show"));
formCloseBtn.addEventListener("click", () => home.classList.remove("show"));

formCloseBtn.addEventListener("click", () => handleLoginCheck);
function handleLoginCheck() {
  if (localStorage.getItem("isLoggedIn") === "true") {
    todoContainer.classList.remove("hidden");
  }
}

signupBtn.addEventListener("click", (e) => {
  e.preventDefault();
  formContainer.classList.add("active");
});

loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  formContainer.classList.remove("active");
});

if (localStorage.getItem("isLoggedIn") === "true") {
  formOpenBtn.classList.add("hidden");
}

loginOutBtn.addEventListener("click", () =>
  localStorage.removeItem("isLoggedIn")
);

if (localStorage.getItem("isLoggedIn") === "false") {
  formOpenBtn.classList.remove("hidden");
}

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector(".login_form form");
  const signupForm = document.querySelector(".signup_form form");
  const formContainer = document.getElementById("form-container");
  const todoContainer = document.getElementById("todo-container");
  const loginButton = document.getElementById("form-open");
  const wrongEmail = document.querySelector(".wrong-email");
  const wrongPassword = document.querySelector(".wrong-password");
  const signupWrongEmail = document.querySelector(".signup-wrong-email");
  const signupWrongPassword = document.querySelector(".signup-wrong-password");

  loginButton.addEventListener("click", () => {
    formContainer.classList.remove("hidden");
    todoContainer.classList.add("hidden");
  });

  document.querySelector(".form_close").addEventListener("click", () => {
    formContainer.classList.add("hidden");
  });

  if (localStorage.getItem("isLoggedIn") === "true") {
    formContainer.classList.add("hidden");
    todoContainer.classList.remove("hidden");
  } else {
    formContainer.classList.remove("hidden");
    todoContainer.classList.add("hidden");
  }

  const email = "admin@gmail.com";
  const password = "12345";

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const userEmailId = loginForm.querySelector('input[type="email"]').value;
    const userPassword = loginForm.querySelector(
      'input[type="password"]'
    ).value;

    if (userEmailId === email && userPassword === password) {
      localStorage.setItem("isLoggedIn", "true");
      formContainer.classList.add("hidden");
      todoContainer.classList.remove("hidden");
    } else {
      wrongEmail.classList.remove("hidden");
      wrongPassword.classList.remove("hidden");
    }
  });

  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const userEmailId = signupForm.querySelector('input[type="email"]').value;
    const userPassword = signupForm.querySelector(
      'input[type="password"]'
    ).value;
    const userConfirmPassword =
      document.getElementById("confirm-password").value;

    if (
      userEmailId === email &&
      userPassword === password &&
      userConfirmPassword === password
    ) {
      localStorage.setItem("isLoggedIn", "true");
      formContainer.classList.add("hidden");
      todoContainer.classList.remove("hidden");
    } else {
      signupWrongEmail.classList.remove("hidden");
      signupWrongPassword.classList.remove("hidden");
    }
  });
});

/**********
 * Todo List Code Start
 ***********/

const listContainer = document.querySelector(".list-container");
const inputBox = document.getElementById("input-box");
const submitBtn = document.getElementById("submit-btn");
const searchTodos = document.getElementById("search-todos");

let todoItems = [];

const loadTodos = () => {
  const storedTodos = localStorage.getItem("todos");
  if (storedTodos) {
    todoItems = JSON.parse(storedTodos);
    displayTodos(todoItems);
  }
};

const displayTodos = (todos) => {
  listContainer.innerHTML = "";
  todos.forEach((todo) => {
    cardContainer(todo);
  });
};

const cardContainer = (todo) => {
  const todoContent = `
        <div class="todoList">
            <h3>${todo}</h3>
            <button class="dltBtn" onclick="deleteHandler(event)">Delete</button>
        </div>
      `;

  listContainer.insertAdjacentHTML("afterbegin", todoContent);
};

function addTask() {
  if (inputBox.value === "") {
    return;
  } else {
    const newTodo = inputBox.value;
    todoItems.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todoItems));
    displayTodos(todoItems);
    inputBox.value = "";
  }
}

submitBtn.addEventListener("click", addTask);

const deleteHandler = (event) => {
  const cardElement = event.target.parentElement;
  const deletedNote = cardElement.querySelector("h3").innerText;
  const todoIndex = todoItems.indexOf(deletedNote);

  if (todoIndex !== -1) {
    todoItems.splice(todoIndex, 1);
    localStorage.setItem("todos", JSON.stringify(todoItems));
    displayTodos(todoItems);
  }
};

searchTodos.addEventListener("input", (e) => {
  const searchQuery = e.target.value.toLowerCase();
  const filteredTodos = todoItems.filter((todo) =>
    todo.toLowerCase().includes(searchQuery)
  );
  displayTodos(filteredTodos);
});

loadTodos();
