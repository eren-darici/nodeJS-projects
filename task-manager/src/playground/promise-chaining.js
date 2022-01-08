require('../db/mongoose');

const User = require('../models/user');

// 61d9f8783729cc74539fa136

User.findByIdAndUpdate("61d9f8783729cc74539fa136", { age: 20 }).then((user) => {
    console.log(user)
    return User.countDocuments({ age: 20 })
}).then((result) => {
    console.log(result)
}).catch((error) => {
    console.log(error)
})