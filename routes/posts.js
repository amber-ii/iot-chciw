const express = require('express');
const router = express();
const User = require('../models/User');


// get all result
router.get('/', async (req, res) => {
    try {
        const posts = await User.find();
        res.json(posts);
    } catch (err) {
        res.json({ message: err });
    }
});


// submit a post
router.post('/', async (req, res) => {
    const post = new User({
        username: req.body.username,
        password: req.body.password,
        permission: req.body.permission
    });

    try {
        const saveUser = await post.save();
        res.json(saveUser);
    }
    catch (err) {
        res.json({ message: err });
    }
});


// specific User
router.get('/:postId', async (req, res) => {
    try {
        const post = await User.findById(req.params.postId);
        res.json(post);
    } catch (err) {
        res.json({ message: err });
    }
});

// Delete Post
router.delete('/:postId', async (req, res) => {
    try {
        const removeUser = await User.remove({ _id: req.params.postId });
        res.json(removeUser);

    } catch (err) {
        res.json({ message: err });
    }
});



// Update User
router.patch('/:postId', async (req, res) => {
    try {
        const updateUser = await User.updateOne(
            { _id: req.params.postId },
            {
                $set: { password: req.body.password },
            },
        );
        res.json(updateUser);
    } catch (err) {
        res.json({ message: err });
    }
});
module.exports = router;