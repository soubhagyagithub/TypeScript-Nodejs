"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const todos = [];
router.get('/', (req, res, next) => {
    res.status(200).json({ todos: todos });
});
router.post('/todo', (req, res, next) => {
    const body = req.body;
    const newTodo = {
        id: new Date().toISOString(),
        text: body.text,
    };
    todos.push(newTodo);
    res.status(200).json({ message: " Added to Todo", todo: newTodo, todos: todos });
});
router.delete('/todo/:todoId', (req, res, next) => {
    const params = req.params;
    todos.filter((todoItem) => todoItem.id !== params.todoId);
    res.status(200).json({ message: " Todo deleted Succesfully", todos: todos });
});
router.put('/todo/:todoId', (req, res, next) => {
    const body = req.body;
    const params = req.body;
    const todoId = params.todoId;
    const todoIndex = todos.findIndex((todo) => todo.id === todoId);
    if (todoIndex >= 0) {
        todos[todoIndex] = { id: todos[todoIndex].id, text: body.text };
        res.status(201).json({ message: "Todo Updated", todos: todos });
    }
    res.status(404).json({ message: " Could not find any todo items" });
});
exports.default = router;
