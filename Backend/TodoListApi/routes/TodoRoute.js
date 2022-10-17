const router = require('express').Router();
const { GetTodos, GetTodo, AddTodo, UpdateTodo, DeleteTodo } = require('../controllers/TodoController');
const { VerifyToken } = require('../middlewares/authToken');

router.get('/todos', VerifyToken, GetTodos);
router.get('/todos/:email', VerifyToken, GetTodo);
router.post('/todos', VerifyToken, AddTodo);
router.put('/todos/:id', VerifyToken, UpdateTodo);
router.delete('/todos/:id', VerifyToken, DeleteTodo);

module.exports = router;