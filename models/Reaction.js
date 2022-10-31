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
                type: Schema.Types.ObjectId,
                ref: 'user',
                required: true,
            },
        ],
        createdAt: {
            type: Date,
            default: () => new Date.createdAt(),
        },
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: true,
    }
);

const Reaction = model('reaction', reactionSchema);

module.exports = Reaction;