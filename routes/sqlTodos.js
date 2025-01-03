const express = require('express');
const router = express.Router();
const SQLTodo = require('../models/sqlTodo');

router.get('/', async (req, res) => {
    try {
        const todos = await SQLTodo.findAll();
        res.json(todos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const todo = await SQLTodo.create({
            title: req.body.title
        });
        res.status(201).json(todo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        await SQLTodo.update({ completed: req.body.completed }, { where: { id: req.params.id } });
        const todo = await SQLTodo.findByPk(req.params.id);
        res.json(todo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await SQLTodo.destroy({
            where: { id: req.params.id }
        });
        res.json({ message: 'Deleted Successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
