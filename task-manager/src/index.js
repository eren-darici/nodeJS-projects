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
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        age: req.body.age
    })

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

// Add a new task
app.post('/api/tasks', async (req, res) => {
    const task = new Task({
        description: req.body.description,
        completed: req.body.completed
    })

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


app.listen(port, () => { console.log("Server is running on port: " + port) });