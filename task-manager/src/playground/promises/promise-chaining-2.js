require('../../db/mongoose');

const Task = require('../../models/task');

// 61d9fc499be85d5bd8800f01


// Task.findByIdAndDelete("61da0069eea57064e499cd6d").then((task) => {
//     console.log(task)
//     return Task.countDocuments({ completed: false })
// }).then((result) =>{
//     console.log(result)
// }).catch((error) => {
//     console.log(error)
// })

const updateCompletedAndCount = async(id, completed) => {
    const task = await Task.findByIdAndUpdate(id, { completed });
    const count = await Task.countDocuments({ completed });
    return count;
}

updateCompletedAndCount("61d9fc499be85d5bd8800f01", false).then((count) => {
    console.log(count)
}).catch((error) => {
    console.log(error)
})