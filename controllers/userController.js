const { User, Thought, Reaction } = require('../models');


module.exports = {
    // Get all users
    getUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    // Get a single user
    getSingleUser(req, res) {
        User.findOne({ username: req.params.username })
            .then((user) =>
                !user ? res.status(404).json({ message: 'Username not found!' })
                    : res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    // Create a user
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // Update a user
    updateUser(req, res) {
        User.findOneAndUpdate(
            { username: req.params.username },
            { $set: { username: req.body.username, email: req.body.email } },)
            .then((user) => {
                !user ? res.status(404).json({ message: 'User not found!' }) : res.json(user)
            })
            .catch((err) => res.status(500).json(err));
    },
    // Delete a user
    deleteUser(req, res) {
        User.findOneAndDelete({ username: req.params.username })
            .then((user) =>
                !user ? res.status(404).json({ message: 'User not found!' })
                    : Thought.deleteMany({ username: { $in: user.thoughts } }))
            .then(() => res.json({ message: 'User deleted!' }))
            .catch((err) => res.status(500).json(err));
    },
    // Add a friend
    addFriend(req, res) {
        User.findOneAndUpdate(
            { username: req.params.username },
            { $addToSet: { friends: req.body.username } })
            .then( (user) => {
                !user
                    ? res.status(404).json({ message: 'User not found!' })
                    : res.json(`${req.body.username} added as ${req.params.username}'s friend`)
            })
            .catch((err) => res.status(500).json(err));
    },
    // Remove a friend
    removeFriend(req, res) {
        User.findOneAndUpdate(
            { username: req.params.username },
            { $pull: { friends: req.body.username } })
            .then( (user) => {
                !user
                    ? res.status(404).json({ message: 'User not found!' })
                    : res.json(`${req.body.username} removed as ${req.params.username}'s friend`)
            })
            .catch((err) => res.status(500).json(err));
    },
};