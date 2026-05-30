const todoForm = document.getElementById('todoForm');
const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');
const countSpan = document.getElementById('count');
const clearBtn = document.getElementById('clearCompleted');
const filterBtns = document.querySelectorAll('.filter-btn');

let todos = JSON.parse(localStorage.getItem('todos')) || [];
let currentFilter = 'all';

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function renderTodos() {
    todoList.textContent = ''; // Xóa list cũ
    let filteredTodos = todos;
    
    if (currentFilter === 'active') filteredTodos = todos.filter(t => !t.completed);
    if (currentFilter === 'completed') filteredTodos = todos.filter(t => t.completed);

    filteredTodos.forEach(todo => {
        const li = document.createElement('li');
        if (todo.completed) li.classList.add('completed');
        li.dataset.id = todo.id;

        const span = document.createElement('span');
        span.className = 'todo-text';
        span.textContent = todo.text;

        const btn = document.createElement('button');
        btn.className = 'delete-btn';
        btn.textContent = '❌';

        li.appendChild(span);
        li.appendChild(btn);
        todoList.appendChild(li);
    });

    const activeCount = todos.filter(t => !t.completed).length;
    countSpan.textContent = `${activeCount} items left`;
    saveTodos();
}

// Add Todo
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = todoInput.value.trim();
    if (text) {
        todos.push({ id: Date.now().toString(), text, completed: false });
        todoInput.value = '';
        renderTodos();
    }
});

// Event Delegation cho Toggle và Delete
todoList.addEventListener('click', (e) => {
    const li = e.target.closest('li');
    if (!li) return;
    const id = li.dataset.id;

    if (e.target.classList.contains('delete-btn')) {
        todos = todos.filter(t => t.id !== id);
        renderTodos();
    } else if (e.target.classList.contains('todo-text')) {
        const todo = todos.find(t => t.id === id);
        todo.completed = !todo.completed;
        renderTodos();
    }
});

// Double click để Edit
todoList.addEventListener('dblclick', (e) => {
    if (e.target.classList.contains('todo-text')) {
        const li = e.target.closest('li');
        const id = li.dataset.id;
        const todo = todos.find(t => t.id === id);
        
        const input = document.createElement('input');
        input.type = 'text';
        input.value = todo.text;
        
        li.textContent = '';
        li.appendChild(input);
        input.focus();

        input.addEventListener('blur', () => saveEdit(id, input.value));
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') saveEdit(id, input.value);
        });
    }
});

function saveEdit(id, newText) {
    const todo = todos.find(t => t.id === id);
    if (newText.trim()) todo.text = newText.trim();
    renderTodos();
}

// Filters
filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        currentFilter = e.target.dataset.filter;
        renderTodos();
    });
});

clearBtn.addEventListener('click', () => {
    todos = todos.filter(t => !t.completed);
    renderTodos();
});

// Init
renderTodos();