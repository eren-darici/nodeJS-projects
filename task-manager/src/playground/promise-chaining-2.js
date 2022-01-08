require('../db/mongoose');

const Task = require('../models/task');


Task.findByIdAndDelete("61da0069eea57064e499cd6d").then((task) => {
    console.log(task)
    return Task.countDocuments({ completed: false })
}).then((result) =>{
    console.log(result)
}).catch((error) => {
    console.log(error)
})