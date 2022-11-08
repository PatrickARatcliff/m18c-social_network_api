const { Schema, model } = require('mongoose');
const { ObjectId } = require('mongoose').Types;

// Schema to create a thought model
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new ObjectId(),
        },
        reactionText: {
            type: String,
            required: true,
            maxLength: [280, 'Reactions must be less than 280 characters.']
        },
        username: [
            {
                type: String,
                // ref: 'user',
                required: true,
            },
        ],
        createdAt: {
            type: Date,
            default: () => new Date(),
        },
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// const Reaction = model('reaction', reactionSchema);

module.exports = reactionSchema;