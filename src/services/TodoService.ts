import { Todo } from '../models/Todo';

type TodoInput = {
  title: string;
  description: string;
  priority: 'A' | 'B' | 'C' | 'D';
};

export class TodoService {
  private todos: Todo[] = [];

  async getAllTodos(): Promise<Todo[]> {
    return this.todos;
  }

  async createTodo(todoData: TodoInput): Promise<Todo> {
    const todo: Todo = {
      id: Date.now().toString(),
      title: todoData.title,
      description: todoData.description,
      priority: todoData.priority,
      completed: false,
      createdAt: new Date()
    };
    this.todos.push(todo);
    return todo;
  }

  async updateTodo(id: string, todoData: Partial<Todo>): Promise<Todo> {
    const todoIndex = this.todos.findIndex(todo => todo.id === id);
    if (todoIndex === -1) {
      throw new Error('Todo not found');
    }

    this.todos[todoIndex] = {
      ...this.todos[todoIndex],
      ...todoData,
      updatedAt: new Date()
    };

    return this.todos[todoIndex];
  }

  async deleteTodo(id: string): Promise<void> {
    const todoIndex = this.todos.findIndex(todo => todo.id === id);
    if (todoIndex === -1) {
      throw new Error('Todo not found');
    }

    this.todos.splice(todoIndex, 1);
  }
} 