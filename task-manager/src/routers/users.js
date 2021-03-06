const express = require('express');
const User = require('../models/user');
const router = express.Router();
const auth = require('../middleware/auth');

// Add a new user
router.post('/api/users', async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch (error) {
        return res.status(400).send(error)
    }
})

//  User login
router.post('/api/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({ user, token });
    } catch (error) {
        return res.status(500).send({ error: 'Unable to login!' })
    }
})

// User logout from current session
router.post('/api/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })

        await req.user.save();

        res.send();

    } catch (error) {
        return res.status(500).send(error)
    }
})

// User logout from all sessions
router.post('/api/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [];

        await req.user.save();

        res.send();
    } catch (error) {
        return res.status(500).send(error)
    }
})

// Logged user profile
router.get('/api/users/me', auth, async (req, res) => {
    res.send(req.user);
})

//  Update logged user
router.patch('/api/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update]);
        await req.user.save();

        res.send(req.user);

    } catch (error) {
        return res.status(400).send(error)
    }
})

// Delete logged user
router.delete('/api/users/me', auth, async (req, res) => {
    try {
        await req.user.remove();
        res.send({'message': 'User deleted!'});
    }
    catch (error) {
        return res.status(500).send()
    }
})


module.exports = router;