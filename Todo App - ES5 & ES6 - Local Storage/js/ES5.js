// A function for less code.
function select(query) {
  return document.querySelector(query);
}

// ================= Variables =================
const form = select(".form");
const list = select(".todo-list");
const input = select(".input");

// ================= Objects =================
function Todo(task) {
  this.task = task;
}

function UI() {}

UI.prototype.create = function (todo) {
  const html = `
    <tr>
      <td>${todo.task}</td>
      <td><button class="btn btn-sm btn-danger delete">Delete</button></td>
    </tr>
        `;
  list.innerHTML += html;
};

UI.prototype.delete = function (element) {
  if (element.classList.contains("delete")) {
    element.parentElement.parentElement.remove();
  }
};

UI.prototype.clear = function () {
  input.value = "";
};

// ================= Functions =================
function createTodo(e) {
  const task = input.value;

  // Constructors
  const ui = new UI();
  const todo = new Todo(task);

  // Add to list
  ui.create(todo);

  // Clear Input
  ui.clear();

  // Prevent form submit
  e.preventDefault();
}

// ================= Listeners =================
form.addEventListener("submit", function (e) {
  createTodo(e);
});

list.addEventListener("click", function (e) {
  const ui = new UI();
  ui.delete(e.target);
});