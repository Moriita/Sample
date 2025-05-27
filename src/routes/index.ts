import express from 'express';
import { TodoController } from '../controllers/TodoController';

const router = express.Router();
const todoController = new TodoController();

// Todo関連のルート
router.get('/', todoController.index);
router.get('/todos', todoController.getAllTodos);
router.post('/todos', todoController.createTodo);
router.put('/todos/:id', todoController.updateTodo);
router.delete('/todos/:id', todoController.deleteTodo);

export { router }; 