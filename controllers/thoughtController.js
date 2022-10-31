const { User, Thought, Reaction } = require('../models');

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
            .then((user) =>
                !user ? res.status(404).json({ message: 'Username not found!' })
                    : res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    // create thought
    createThought(req, res) {
        Thought.create(req.body)
            .then(async (thought) => {
                await User.findOneAndUpdate(
                    { userName: thought.userName },
                    { $addToSet: { thoughts: thought._id } },
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
            { $set: { thoughtText: req.body } },)
            .then((thought) => {
                !thought ? res.status(404).json({ message: 'Thought not found!' }) : res.json(user)
            })
            .catch((err) => res.status(500).json(err));
    },
    // delete a thought
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought ? res.status(404).json({ message: 'Thought not found!' })
                    : Reaction.deleteMany({ reactionId: { $in: thought.reactions } }))
            .then(() => res.json({ message: 'Thought deleted!' }))
            .catch((err) => res.status(500).json(err));
    },
    // add a reaction to a thought using thoughtId and reactionId
    addReaction(req, res) {
        Reaction.create(req.body)
            .then(async (reaction) => {
                await Thought.findOneAndUpdate(
                    { _id: req.params.thoughtId },
                    { $addToSet: { reactions: reaction.reactionId } })
                    .catch((err) => {
                        console.log(err);
                        return res.status(500).json(err);
                    });
            })
    },
    // remove a reaction to a thought using thoughtId and reactionId
    removeReaction(req, res) {
        Reaction.findOneAndDelete(req.params.reactionId)
            .then(async (reaction) => {
                await Thought.findOneAndUpdate(
                    { _id: req.params.thoughtId },
                    { $pull: { reactions: reaction.reactionId } })
            })
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
