// Express
const express = require('express');

//  Mongoose connection
require('./db/mongoose');

// Models
const User = require('./models/user');
const Task = require('./models/task');

// Express Settings
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());


// Rest API Routes
// Add a new user
app.post('/api/users', async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        return res.status(400).send(error)
    }
})

// Get all users
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (error) {
        return res.status(500).send(error)
    }
})

// Get user by id
app.get('/api/users/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findById(_id);

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (error) {
        return res.status(500).send(error)
    }

})

//  Update user by id
app.patch('/api/users/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    try {
        if (!isValidOperation) {
            return res.status(400).send({ error: 'Invalid updates!' })
        }

        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        if (!user) {
            return res.status(404).send()
        }

        res.send(user);

    } catch (error) {
        return res.status(400).send(error)
    }
})

// Add a new task
app.post('/api/tasks', async (req, res) => {
    const task = new Task(req.body);

    try {
        await task.save();
        res.send(task);
    } catch (error) {
        return res.status(500).send(error)
    }


})

// Get all tasks
app.get('/api/tasks', async (req, res) => {

    try {
        const tasks = await Task.find({});
        res.send(tasks);
    } catch (error) {
        return res.status(500).send(error)
    }
})

// Get task by id
app.get('/api/tasks/:id', async (req, res) => {
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
app.patch('/api/tasks/:id', async (req, res) => {
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


app.listen(port, () => { console.log("Server is running on port: " + port) });