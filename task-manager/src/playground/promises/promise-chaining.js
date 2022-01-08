require('../../db/mongoose');

const User = require('../../models/user');

// 61d9f8783729cc74539fa136

// User.findByIdAndUpdate("61d9f8783729cc74539fa136", { age: 20 }).then((user) => {
//     console.log(user)
//     return User.countDocuments({ age: 20 })
// }).then((result) => {
//     console.log(result)
// }).catch((error) => {
//     console.log(error)
// })

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age });
    const count = await User.countDocuments({ age });
    return count;
}

updateAgeAndCount("61d9f8783729cc74539fa136", 2).then((count) => {
    console.log(count)
}).catch((error) => {
    console.log(error)
})