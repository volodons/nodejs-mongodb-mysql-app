function loadMongoTodos() {
    fetch('/api/mongo/todos')
        .then((res) => res.json())
        .then((todos) => {
            const list = document.getElementById('mongoTodos');
            list.innerHTML = todos
                .map(
                    (todo) => `
                    <li class="${todo.completed ? 'completed' : ''}">
                        <input type="checkbox" 
                               ${todo.completed ? 'checked' : ''} 
                               onChange="toggleMongoTodo('${todo._id}', ${!todo.completed})">
                        ${todo.title}
                        <button onclick="deleteMongoTodo('${todo._id}')">Delete</button>
                    </li>
                `
                )
                .join('');
        });
}

function addMongoTodo() {
    const input = document.getElementById('mongoTodoInput');
    const title = input.value.trim();
    if (!title) return;

    fetch('/api/mongo/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
    }).then(() => {
        input.value = '';
        loadMongoTodos();
    });
}

function toggleMongoTodo(id, completed) {
    fetch(`/api/mongo/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed })
    }).then(() => loadMongoTodos());
}

function deleteMongoTodo(id) {
    fetch(`/api/mongo/todos/${id}`, {
        method: 'DELETE'
    }).then(() => loadMongoTodos());
}
