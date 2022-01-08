// Express
const express = require('express');

// Express Routers
const userRouter = require('./routers/users');
const taskRouter = require('./routers/tasks');

//  Mongoose connection
require('./db/mongoose');

// Models
const Task = require('./models/task');

// Express Settings
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Rest API Routes
app.use([userRouter, taskRouter]);

app.listen(port, () => { console.log("Server is running on port: " + port) });