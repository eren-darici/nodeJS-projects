const express = require('express');
const Task = require('../models/task');
const router = express.Router();


// Add a new task
router.post('/api/tasks', async (req, res) => {
    const task = new Task(req.body);

    try {
        await task.save();
        res.send(task);
    } catch (error) {
        return res.status(500).send(error)
    }


})

// Get all tasks
router.get('/api/tasks', async (req, res) => {

    try {
        const tasks = await Task.find({});
        res.send(tasks);
    } catch (error) {
        return res.status(500).send(error)
    }
})

// Get task by id
router.get('/api/tasks/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findById(_id);

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (error) {
        return res.status(500).send(error)
    }
})

// Update task by id
router.patch('/api/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    try {
        if (!isValidOperation) {
            return res.status(400).send({ error: 'Invalid updates!' })
        }

        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        if (!task) {
            return res.status(404).send()
        }

        res.send(task);

    } catch (error) {
        return res.status(400).send(error)
    }
})

// Delete task by id
router.delete('/api/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);

        if (!task) {
            return res.status(404).send()
        }

        res.send(task);
    }
    catch (error) {
        return res.status(500).send(error)
    }
})

module.exports = router;