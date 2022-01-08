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
app.post('/api/users', (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        age: req.body.age
    })

    user.save().then(() => {
        res.status(201).send(user);
    }).catch((error) => {
        res.status(400).send(error);
    })
})

// Get all users
app.get('/api/users', (req, res) => {
    User.find({}).then((users) => {
        res.status(200).send(users);
    }).catch((error) => {
        res.status(500).send(error);
    })
})

// Get user by id
app.get('/api/users/:id', (req, res) => {
    const _id = req.params.id

    User.findById(_id).then((user) => {
        if (!user) {
            return res.status(404).send("User not found!");
        }

        res.status(200).send(user);

    }).catch((error) => {
        res.status(500).send(error);
    })
})

// Add a new task
app.post('/api/tasks', (req, res) => {
    const task = new Task({
        description: req.body.description,
        completed: req.body.completed
    })

    task.save().then(() => {
        res.status(201).send(task);
    }).catch((error) => {
        res.status(400).send(error);
    })
})

// Get all tasks
app.get('/api/tasks', (req, res) => {
    Task.find({}).then((tasks) => {
        res.status(200).send(tasks);
    }).catch((error) => {
        res.status(500).send(error);
    })
})

// Get task by id
app.get('/api/tasks/:id', (req, res) => {
    const _id = req.params.id

    Task.findById(_id).then((task) => {
        if (!task) {
            return res.status(404).send("Task not found!");
        }

        res.status(200).send(task);

    }).catch((error) => {
        res.status(500).send(error);
    })
})


app.listen(port, () => { console.log("Server is running on port: " + port) });