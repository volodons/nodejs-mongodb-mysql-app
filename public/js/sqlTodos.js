function loadSQLTodos() {
    fetch('/api/sql/todos')
        .then((res) => res.json())
        .then((todos) => {
            const list = document.getElementById('sqlTodos');
            list.innerHTML = todos
                .map(
                    (todo) => `
                    <li class="${todo.completed ? 'completed' : ''}">
                        <input type="checkbox" 
                               ${todo.completed ? 'checked' : ''} 
                               onChange="toggleSQLTodo(${todo.id}, ${!todo.completed})">
                        ${todo.title}
                        <button onclick="deleteSQLTodo(${todo.id})">Delete</button>
                    </li>
                `
                )
                .join('');
        });
}

function addSQLTodo() {
    const input = document.getElementById('sqlTodoInput');
    const title = input.value.trim();
    if (!title) return;

    fetch('/api/sql/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
    }).then(() => {
        input.value = '';
        loadSQLTodos();
    });
}

function toggleSQLTodo(id, completed) {
    fetch(`/api/sql/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed })
    }).then(() => loadSQLTodos());
}

function deleteSQLTodo(id) {
    fetch(`/api/sql/todos/${id}`, {
        method: 'DELETE'
    }).then(() => loadSQLTodos());
}
