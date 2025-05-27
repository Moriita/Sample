import { Request, Response } from 'express';
import { TodoService } from '../services/TodoService';

export class TodoController {
  private todoService: TodoService;

  constructor() {
    this.todoService = new TodoService();
  }

  index = (req: Request, res: Response) => {
    res.render('index');
  };

  getAllTodos = async (req: Request, res: Response) => {
    try {
      const todos = await this.todoService.getAllTodos();
      res.json(todos);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch todos' });
    }
  };

  createTodo = async (req: Request, res: Response) => {
    try {
      const { title, description, priority } = req.body;
      if (!priority || !['A', 'B', 'C', 'D'].includes(priority)) {
        return res.status(400).json({ error: 'Invalid priority value' });
      }
      const todo = await this.todoService.createTodo({ title, description, priority });
      res.status(201).json(todo);
    } catch (error) {
      res.status(400).json({ error: 'Failed to create todo' });
    }
  };

  updateTodo = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { title, description, completed, priority } = req.body;
      if (priority && !['A', 'B', 'C', 'D'].includes(priority)) {
        return res.status(400).json({ error: 'Invalid priority value' });
      }
      const todo = await this.todoService.updateTodo(id, { title, description, completed, priority });
      res.json(todo);
    } catch (error) {
      res.status(400).json({ error: 'Failed to update todo' });
    }
  };

  deleteTodo = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await this.todoService.deleteTodo(id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: 'Failed to delete todo' });
    }
  };
} 