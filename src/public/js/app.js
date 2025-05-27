document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todoForm');
    const todoList = document.getElementById('todoList');
    const deleteConfirmModal = new bootstrap.Modal(document.getElementById('deleteConfirmModal'));
    const deleteConfirmMessage = document.getElementById('deleteConfirmMessage');
    const confirmDeleteButton = document.getElementById('confirmDeleteButton');
    let todoToDelete = null;

    // HTMLエスケープ関数
    const escapeHtml = (str) => {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    };

    // Todoリストの取得
    const fetchTodos = async () => {
        try {
            const response = await fetch('/todos');
            const todos = await response.json();
            displayTodos(todos);
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    };

    // Todoの表示
    const displayTodos = (todos) => {
        todoList.innerHTML = '';
        // 優先度でソート（A→Dの順）
        todos.sort((a, b) => a.priority.localeCompare(b.priority));
        todos.forEach(todo => {
            const todoElement = createTodoElement(todo);
            todoList.appendChild(todoElement);
        });
    };

    // 優先度に応じたバッジの色を取得
    const getPriorityBadgeClass = (priority) => {
        switch (priority) {
            case 'A': return 'bg-danger';
            case 'B': return 'bg-warning';
            case 'C': return 'bg-info';
            case 'D': return 'bg-secondary';
            default: return 'bg-secondary';
        }
    };

    // Todo要素の作成
    const createTodoElement = (todo) => {
        const div = document.createElement('div');
        div.className = `list-group-item ${todo.completed ? 'bg-light' : ''}`;
        const escapedTitle = escapeHtml(todo.title);
        const escapedDescription = escapeHtml(todo.description);
        const escapedPriority = escapeHtml(todo.priority);
        
        div.innerHTML = `
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <div class="d-flex align-items-center">
                        <span class="badge ${getPriorityBadgeClass(todo.priority)} me-2">優先度 ${escapedPriority}</span>
                        <h5 class="mb-1">${escapedTitle}</h5>
                    </div>
                    <p class="mb-1">${escapedDescription}</p>
                </div>
                <div>
                    <button class="btn btn-sm btn-success me-2" onclick="toggleTodo('${todo.id}', ${!todo.completed}, '${escapedTitle}', '${escapedDescription}', '${escapedPriority}')">
                        ${todo.completed ? '未完了' : '完了'}
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="showDeleteConfirm('${todo.id}', '${escapedTitle}')">削除</button>
                </div>
            </div>
        `;
        return div;
    };

    // Todoの作成
    todoForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const priority = document.getElementById('priority').value;

        try {
            const response = await fetch('/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, description, priority }),
            });

            if (response.ok) {
                todoForm.reset();
                fetchTodos();
            }
        } catch (error) {
            console.error('Error creating todo:', error);
        }
    });

    // Todoの完了/未完了の切り替え
    window.toggleTodo = async (id, completed, title, description, priority) => {
        try {
            const response = await fetch(`/todos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: title,
                    description: description,
                    priority: priority,
                    completed: completed
                }),
            });

            if (response.ok) {
                fetchTodos();
            }
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };

    // 削除確認モーダルの表示
    window.showDeleteConfirm = (id, title) => {
        todoToDelete = id;
        deleteConfirmMessage.textContent = `「${title}」を削除してもよろしいですか？`;
        deleteConfirmModal.show();
    };

    // 削除の実行
    confirmDeleteButton.addEventListener('click', async () => {
        if (todoToDelete) {
            await deleteTodo(todoToDelete);
            deleteConfirmModal.hide();
            todoToDelete = null;
        }
    });

    // Todoの削除
    const deleteTodo = async (id) => {
        try {
            const response = await fetch(`/todos/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                fetchTodos();
            }
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    // 初期表示
    fetchTodos();
}); 