const { User, Thought, reactionSchema } = require('../models');

module.exports = {
    // get all thoughts
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    // get a single thought
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought ? res.status(404).json({ message: 'Thought not found!' })
                    : res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    // create thought
    createThought(req, res) {
        Thought.create(req.body)
            .then(async (thought) => {
                return User.findOneAndUpdate(
                    { username: req.body.username },
                    { $push: { thoughts: thought._id } },
                    { new: true },
                );
            })
            .then((user) => {
                !user
                    ? res.status(404).json({ message: 'Thought created but no user with this id!' })
                    : res.json(user)
            })
            .catch((err) => res.status(500).json(err));

    },
    // update a thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: { thoughtText: req.body.thoughtText} },
            { returnOriginal: false },
            )
            .then((thought) => {
                !thought ? res.status(404).json({ message: 'Thought not found!' }) : res.json(thought)
            })
            .catch((err) => res.status(500).json(err));
    },
    // delete a thought
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought ? res.status(404).json({ message: 'Thought not found!' })
                    : res.json({ message: 'Thought deleted!' }))
            .catch((err) => res.status(500).json(err));
    },
    // add a reaction to a thought using thoughtId
    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $push: { reactions: req.body } },
            { runValidators: true, new: true })
            .then((thought) =>
            !thought
              ? res
                  .status(404)
                  .json({ message: 'No thought found with that ID :(' })
              : res.json(thought))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // remove a reaction to a thought using thoughtId and reactionId
    removeReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { _id: req.params.reactionId } } },
            )
            .then((reaction) => {
                !reaction
                    ? res.status(404).json({ message: 'Raection not found!' })
                    : res.json(`Reaction removed from thought!`)
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err)
            });
    },
};
