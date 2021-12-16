// A function for less code.
const select = (query) => document.querySelector(query);

// ================= Variables =================
const form = select(".form");
const list = select(".todo-list");
const input = select(".input");

// ================= Objects =================
class Todo {
  constructor(task) {
    this.id = Math.floor(Math.random() * 1000);
    this.task = task;
  }
}

class UI {
  create(todo) {
    const html = `
        <tr>
          <td>${todo.task}</td>
          <td><button data-id="${todo.id}" class="btn btn-sm btn-danger delete">Delete</button></td>
        </tr>
            `;
    list.innerHTML += html;
  }

  delete(element) {
    if (element.classList.contains("delete")) {
      element.parentElement.parentElement.remove();
    }
  }

  clear() {
    input.value = "";
  }
}

class Storage {
  static get() {
    let todos;

    localStorage.getItem("todos")
      ? (todos = JSON.parse(localStorage.getItem("todos")))
      : (todos = []);

    return todos;
  }

  static add(todo) {
    const todos = Storage.get();
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  static delete(element) {
    if (element.classList.contains("delete")) {
      const id = element.getAttribute("data-id");
      const todos = Storage.get()

      todos.map((todo, index) => {
        todo.id == id && todos.splice(index, 1)
      })

      localStorage.setItem("todos", JSON.stringify(todos))
    }
  }

  static display() {
    const todos = Storage.get();

    todos.map((todo) => {
      const ui = new UI();
      ui.create(todo);
    });
  }
}

// ================= Functions =================
const createTodo = (e) => {
  const task = input.value;

  // Constructors
  const ui = new UI();
  const todo = new Todo(task);

  // Add to list
  ui.create(todo);

  // Save to Local Storage
  Storage.add(todo);

  // Clear Input
  ui.clear();

  // Prevent form submit
  e.preventDefault();
};

// ================= Listeners =================
form.onsubmit = (e) => createTodo(e);

list.onclick = (e) => {
  const ui = new UI();

  // Delete todo
  ui.delete(e.target);

  // Delete todo from Local Storage
  Storage.delete(e.target);
};

document.onDOMContentLoaded = Storage.display();