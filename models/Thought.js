const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

// Schema to create a thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: [1, 'Thoughts must be 1-280 characters.'],
      maxLength: [280, 'Thoughts must be 1-280 characters.'],
    },
    createdAt: {
      type: Date,
      default: () => new Date(),
    },
    username: [
      {
        type: String,
        // ref: 'user',
        required: true,
      },
    ],
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `thoughtCount` that gets the amount of friends per user
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;