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
    saveLocalStorageData();

    input.value = "";
    showTodo(newTask);
});


function saveLocalStorageData() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

function ToDoComplete(todo, textElement) {
    todo.completed = !todo.completed;

    if (todo.completed) {
        textElement.style.textDecoration = "line-through";
        textElement.style.color = "black";
    } 
    
    saveLocalStorageData();
}
function ToDoRemove(todo, element) {
    if (!todo.completed) {
        alert("Please click on this task and complete it first only then will it be deleted!");
        return; 
    }else{
        alert("Task Delete Success Full!");

    }
    todos = todos.filter(e => e.id !== todo.id);
    saveLocalStorageData();
    element.remove();
}

function showTodo(todo) {
    const li = document.createElement("li");

    li.innerHTML = `
        <span class="task-text" style="${todo.completed ? 'text-decoration: line-through; color: gray;' : ''}">
            ${todo.text}
        </span>
        <button class="delete-btn">Delete</button>
    `;

    const taskText = li.querySelector(".task-text");
    const deleteBtn = li.querySelector(".delete-btn");
    taskText.addEventListener("click", () => ToDoComplete(todo, taskText));
    deleteBtn.addEventListener("click", () => ToDoRemove(todo, li));

    list.appendChild(li);
}
