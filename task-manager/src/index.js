// Express
const express = require('express');

// Custom Middleware
const logger = require('./middleware/logger');
const maintenanceMode = require('./middleware/maintenanceMode');

// DotEnv
const dotenv = require('dotenv');
dotenv.config();

// Express Routers
const userRouter = require('./routers/users');
const taskRouter = require('./routers/tasks');

//  Mongoose connection
require('./db/mongoose');

// Express Settings
const app = express();
const port = process.env.PORT || 3000;

// Middleware
// Custom logger middleware
app.use(logger);
// app.use(maintenanceMode);


// JSON Parser
app.use(express.json());

// Rest API Routes
app.use([userRouter, taskRouter]);

app.listen(port, () => { console.log("Server is running on port: " + port) });