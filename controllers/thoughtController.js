addFriend(req, res) {
    Reaction.create(req.body)
        .then( async (reaction) => {
            await User.findOneAndUpdate(
                { username: req.params.username },
                { $addToSet: { thoughts: reaction.reactionId } })
            .then( async ()))
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
},