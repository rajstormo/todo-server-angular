const express = require("express");
const router = express.Router();

const todosController = require("../../controllers/todosController");

router.get('/todos', todosController.getTodos);
router.get('/todo/:id', todosController.getTodo);

router.post('/todo', todosController.createTodo);
router.put('/todo/:id', todosController.updateTodo);

router.delete('/todo/:id', todosController.deleteTodo)

module.exports = router;