const express = require('express');
const Task = require('../models/task');
const auth = require('../middleware/auth');
const router = express.Router();


// Add a new task
router.post('/api/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    });

    try {
        await task.save();
        res.send(task);
    } catch (error) {
        return res.status(500).send(error)
    }


})

// Get all tasks
router.get('/api/tasks', auth, async (req, res) => {
    try {
        const tasks = await Task.find({ owner: req.user._id });
        res.send(tasks);
    } catch (error) {
        return res.status(500).send(error)
    }
})

// Get task by id
router.get('/api/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findOne({ _id, owner: req.user._id });

        if (!task) {
            return res.status(404).send({ error: 'Task not found' })
        }

        res.send(task)
    } catch (error) {
        return res.status(500).send(error)
    }
})

// Update task by id
router.patch('/api/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id;

    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const task = await Task.findOne({ _id, owner: req.user._id });

        updates.forEach((update) => task[update] = req.body[update]);
        await task.save();

        if (!task) {
            return res.status(404).send({ error: 'Task not found!' })
        }

        res.send(task);

    } catch (error) {
        return res.status(400).send(error)
    }
})

// Delete task by id
router.delete('/api/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id;
    try {
        const task = await Task.findOneAndDelete({ _id, owner: req.user._id });

        if (!task) {
            return res.status(404).send({ 'error': 'Task not found!' })
        }

        res.send(task);
    }
    catch (error) {
        return res.status(500).send(error)
    }
})

module.exports = router;