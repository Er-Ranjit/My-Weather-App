const input = document.getElementById("todoInput");
const button = document.getElementById("addBtn");
const list = document.getElementById("todoList");

let todos = JSON.parse(localStorage.getItem("todos")) || [];
button.addEventListener("click", () => {
    const text = input.value;
    if (text === "") {
        return;
    }
    const todo = {
        text: text
    };
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
    input.value = "";

    
    showTodos();
});


function showTodos() {
    list.innerHTML = "";
    todos.forEach((todo, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${todo.text}
            <button onclick="deleteTodo(${index})">
                Delete
            </button>
        `;
        list.appendChild(li);
    });
}


function deleteTodo(index) {
    todos.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
    showTodos();
}


showTodos();