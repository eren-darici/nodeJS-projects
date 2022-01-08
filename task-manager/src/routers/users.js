const express = require('express');
const User = require('../models/user');
const router = express.Router();


// Add a new user
router.post('/api/users', async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        return res.status(400).send(error)
    }
})

// Get all users
router.get('/api/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (error) {
        return res.status(500).send(error)
    }
})

// Get user by id
router.get('/api/users/:id', async (req, res) => {
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
router.patch('/api/users/:id', async (req, res) => {
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

// Delete user by id
router.delete('/api/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).send()
        }

        res.send(user);
    }
    catch (error) {
        return res.status(500).send(error)
    }
})


module.exports = router;