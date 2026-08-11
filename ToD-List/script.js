const input = document.getElementById("todoInput");
const button = document.getElementById("addBtn");
const list = document.getElementById("todoList");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

todos.forEach((todo) => {
    showTodo(todo);
});

button.addEventListener("click", () => {
    const text = input.value.trim();

    if (text === "") return;

    let newTask = {
        id: Date.now(),
        text: text,
        completed: false
    };

    todos.push(newTask);
    localStorage.setItem("todos", JSON.stringify(todos));

    input.value = "";
    showTodo(newTask);
});


function showTodo(todo) {
    const li = document.createElement("li");

    li.innerHTML = `
        ${todo.text}
        <button  type="button" onclick="deleteTodo(${todo.id})">
            Delete
        </button>
    `;

    list.appendChild(li);
}

function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);

    localStorage.setItem("todos", JSON.stringify(todos));

    list.innerHTML = "";

    todos.forEach((todo) => {
        showTodo(todo);
    });
}